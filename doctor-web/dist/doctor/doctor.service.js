"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const firebase_service_1 = require("../firebase/firebase.service");
const common_1 = require("@nestjs/common");
const type_1 = require("../common/types/type");
let DoctorService = class DoctorService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    isFindFilterDoctor(data, filters) {
        if (filters?.availability && !data?.availability?.length) {
            return false;
        }
        if (filters?.name &&
            !(data?.display_name?.toLocaleLowerCase() || '').includes(filters?.name?.trim()?.toLocaleLowerCase())) {
            return false;
        }
        if (filters?.expertise && Array.isArray(data?.expertiseList)) {
            const hasExpertise = data?.expertiseList?.some((ex) => (ex?.trim()?.toLocaleLowerCase() || '').includes(filters?.expertise?.trim()?.toLocaleLowerCase()));
            if (!hasExpertise) {
                return false;
            }
        }
        return true;
    }
    isFindSearchDoctor(data, filters) {
        if (!filters?.search) {
            return true;
        }
        if (filters?.search &&
            (data?.display_name?.toLocaleLowerCase() || '').includes(filters?.search?.trim()?.toLocaleLowerCase())) {
            return true;
        }
        if (filters?.search && Array.isArray(data?.expertiseList)) {
            const hasExpertise = data?.expertiseList?.some((ex) => (ex?.trim()?.toLocaleLowerCase() || '').includes(filters?.search?.trim()?.toLocaleLowerCase()));
            if (hasExpertise) {
                return true;
            }
        }
        return false;
    }
    async getDoctors(filters, userRole = type_1.IRole.ADMIN) {
        const fireStore = this.firebaseService.getFireStore();
        const serviceData = {};
        const serviceIds = [];
        const services = await fireStore
            .collection(this.firebaseService.collections.services)
            .get();
        services.docs.forEach((doc) => {
            const data = doc?.data();
            serviceData[data?.service_id] = data;
            if ((data?.name?.trim().toLocaleLowerCase() || '').includes(filters?.service?.trim()?.toLocaleLowerCase())) {
                serviceIds.push(data?.service_id);
            }
        });
        let doctorRef = fireStore.collection(this.firebaseService.collections.profiles);
        doctorRef = doctorRef.where('role', '==', type_1.IRole.DOCTOR);
        if (filters?.service && serviceIds.length) {
            doctorRef = doctorRef.where('services', 'array-contains-any', serviceIds);
        }
        const doctorSnapshot = await doctorRef.get();
        const doctorResults = [];
        doctorSnapshot.docs.forEach((doc) => {
            const data = doc.data();
            if (!this.isFindFilterDoctor(data, filters)) {
                return;
            }
            if (!this.isFindSearchDoctor(data, filters)) {
                return;
            }
            if (!data?.availability) {
                data.availability = [];
            }
            if (data?.availabilitySlots) {
                try {
                    data.availabilitySlots = JSON.parse(data.availabilitySlots);
                }
                catch (error) {
                    data.availabilitySlots = [];
                }
            }
            if (!data.star_rating &&
                Array.isArray(data?.ratings) &&
                data?.ratings?.length) {
                const total_ratings = (data?.ratings).reduce((p, c) => +p + +c, 0);
                data.star_rating = +parseFloat(String(total_ratings / data?.ratings?.length)).toFixed(2);
                data.star_rating = data.star_rating > 5 ? 5 : data.star_rating;
            }
            if (!data.star_rating) {
                data.star_rating = Math.floor(Math.random() * 4);
                data.ratings = [data.star_rating];
            }
            if (Array.isArray(data?.services) && data?.services.length) {
                data.providingServices = data?.services.map((serviceId) => serviceData[serviceId] ?? undefined);
            }
            if (userRole !== type_1.IRole.ADMIN) {
                delete data?.email;
                delete data?.phone;
                delete data?.notification_tokens;
            }
            doctorResults.push(data);
        });
        if (filters?.limit) {
            let randomLimit = doctorResults.length < +filters?.limit
                ? +doctorResults.length
                : +filters?.limit;
            const doctorData = [];
            const checked = [];
            while (randomLimit > 0) {
                const randomIndex = Math.round(Math.random() * doctorResults.length);
                if (!checked.includes(randomIndex) && doctorResults[randomIndex]) {
                    doctorData.push(doctorResults[randomIndex]);
                    checked.push(randomIndex);
                    --randomLimit;
                }
            }
            return doctorData;
        }
        return doctorResults;
    }
    async getDoctorDetails(doctorId, userRole = type_1.IRole.ADMIN) {
        const fireStore = this.firebaseService.getFireStore();
        const doctorData = (await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(doctorId)
            .get()).data();
        if (doctorData?.role !== type_1.IRole.DOCTOR) {
            throw new common_1.HttpException('invalid doctor', common_1.HttpStatus.BAD_REQUEST);
        }
        if (doctorData?.services?.length) {
            const servicesRef = await fireStore
                .collection(this.firebaseService.collections.services)
                .where('service_id', 'in', doctorData.services)
                .get();
            doctorData.providingServices = servicesRef?.docs?.map((doc) => doc?.data());
        }
        else {
            doctorData.providingServices = [];
        }
        const availabilityDays = {};
        const availabilitySnapshot = await fireStore
            .collection(this.firebaseService.collections.availability_slots)
            .where('uid', '==', doctorId)
            .get();
        doctorData.availabilitySlots = availabilitySnapshot.docs.map((doc) => {
            const data = doc?.data();
            availabilityDays[data?.day] = data?.day;
            return data;
        });
        if (!doctorData?.availability) {
            doctorData.availability = Object.keys(availabilityDays);
        }
        if (!doctorData.star_rating &&
            Array.isArray(doctorData?.ratings) &&
            doctorData?.ratings?.length) {
            const ratings = (doctorData?.ratings).reduce((p, c) => +p + +c, 0);
            doctorData.star_rating = +parseFloat(String(ratings / doctorData?.ratings?.length)).toFixed(2);
            doctorData.star_rating =
                doctorData.star_rating > 5 ? 5 : doctorData.star_rating;
        }
        else {
            doctorData.star_rating = Math.floor(Math.random() * 4);
            doctorData.ratings = [doctorData.star_rating];
        }
        if (userRole !== type_1.IRole.ADMIN) {
            delete doctorData?.email;
            delete doctorData?.phone;
            delete doctorData?.notification_tokens;
        }
        const bookingsSnapshot = await fireStore
            .collection(this.firebaseService.collections.bookings)
            .where('doctor_id', '==', doctorId)
            .where('status', '==', 'completed')
            .limit(100)
            .get();
        const bookings = [];
        for (const bookingDoc of bookingsSnapshot.docs) {
            const booking = bookingDoc?.data();
            const bookingRefs = [];
            bookingRefs.push(booking?.customer ? booking.customer.get() : null);
            bookingRefs.push(booking?.service ? booking.service.get() : null);
            bookingRefs.push(booking?.slot ? booking.slot.get() : null);
            const refs = await Promise.all(bookingRefs);
            booking.customer = refs[0]?.exists ? refs[0]?.data() : {};
            booking.service = refs[1]?.exists ? refs[1]?.data() : {};
            booking.slot = refs[2]?.exists ? refs[2]?.data() : {};
            bookings.push(booking);
        }
        doctorData.bookings = bookings;
        return doctorData;
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map