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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const firebase_service_1 = require("../firebase/firebase.service");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const razorpay_1 = __importDefault(require("razorpay"));
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
const type_1 = require("./type");
const type_2 = require("../common/types/type");
const firebase_notification_service_1 = require("../firebase/firebase-notification.service");
let BookingService = class BookingService {
    constructor(firebaseService, firebaseNotification) {
        this.firebaseService = firebaseService;
        this.firebaseNotification = firebaseNotification;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async getBookings(filters, userRole = type_2.IRole.ADMIN) {
        const fireStore = this.firebaseService.getFireStore();
        let bookingsRef = fireStore.collection(this.firebaseService.collections.bookings);
        let orderBy;
        if (['asc', 'desc'].includes(filters?.order_by)) {
            orderBy = filters?.order_by;
            delete filters.order_by;
        }
        if (filters) {
            for (const filter in filters) {
                bookingsRef = bookingsRef.where(filter, '==', filters[filter]);
            }
        }
        const bookingsDocs = await bookingsRef.get();
        const results = await Promise.all(bookingsDocs.docs.map(async (doc) => {
            const booking = doc.data();
            let doctor = null;
            if (booking?.doctor && userRole == type_2.IRole.CUSTOMER) {
                const doctorSnap = await booking.doctor.get();
                doctor = doctorSnap.data();
                if (userRole == type_2.IRole.CUSTOMER) {
                    delete doctor?.email;
                    delete doctor?.phone;
                    delete doctor?.notification_tokens;
                }
            }
            let customer = null;
            if (booking?.customer && userRole == type_2.IRole.DOCTOR) {
                const customerSnap = await booking.customer.get();
                customer = customerSnap.data();
            }
            let service = null;
            if (booking?.service) {
                const serviceSnap = await booking.service.get();
                service = serviceSnap.data();
            }
            let slot = null;
            if (booking?.slot) {
                const slotSnap = await booking.slot.get();
                slot = slotSnap.data();
            }
            return {
                ...booking,
                doctor,
                customer,
                service,
                slot,
            };
        }));
        if (orderBy) {
            return results.sort((a, b) => {
                if (orderBy === 'asc') {
                    return new Date(a.date).getTime() - new Date(b?.date).getTime();
                }
                if (orderBy === 'desc') {
                    return new Date(b.date).getTime() - new Date(a?.date).getTime();
                }
            });
        }
        return results;
    }
    async getSingleBooking(bookingId, filters = {}, userRole = type_2.IRole.ADMIN) {
        const fireStore = this.firebaseService.getFireStore();
        const bookingsDocs = await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(bookingId)
            .get();
        if (!bookingsDocs?.exists) {
            throw new common_1.HttpException('No booking found', common_1.HttpStatus.BAD_REQUEST);
        }
        const booking = bookingsDocs.data();
        if ((filters.customer_id && booking?.customer_id !== filters.customer_id) ||
            (filters.doctor_id && booking?.doctor_id !== filters.doctor_id)) {
            throw new common_1.HttpException('Invalid booking', common_1.HttpStatus.BAD_REQUEST);
        }
        let doctor = null;
        if (booking?.doctor && userRole == type_2.IRole.CUSTOMER) {
            const doctorSnap = await booking.doctor.get();
            doctor = doctorSnap.data();
            if (userRole == type_2.IRole.CUSTOMER) {
                delete doctor?.email;
                delete doctor?.phone;
                delete doctor?.notification_tokens;
            }
        }
        let customer = null;
        if (booking?.customer && userRole == type_2.IRole.DOCTOR) {
            const customerSnap = await booking.customer.get();
            customer = customerSnap.data();
        }
        let service = null;
        if (booking?.service) {
            const serviceSnap = await booking.service.get();
            service = serviceSnap.data();
        }
        let slot = null;
        if (booking?.slot) {
            const slotSnap = await booking.slot.get();
            slot = slotSnap.data();
        }
        return {
            ...booking,
            doctor,
            customer,
            service,
            slot,
        };
    }
    async createBooking(payload, user) {
        const fireStore = this.firebaseService.getFireStore();
        const profile = (await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(payload?.customer_id)
            .get()).data();
        if (!profile?.uid) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const service = (await fireStore
            .collection(this.firebaseService.collections.services)
            .doc(payload?.service_id)
            .get()).data();
        if (!service?.service_id) {
            throw new common_1.HttpException('Service not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const doctor = (await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(payload?.doctor_id)
            .get()).data();
        if (!doctor?.uid) {
            throw new common_1.HttpException('Doctor not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const payloadDate = new Date(payload?.date);
        const bookingDate = `${payloadDate.getFullYear()}-${+payloadDate.getMonth() + 1}-${payloadDate.getDate()}`;
        let paymentStatus = user?.role === type_2.IRole.ADMIN && payload?.payment?.status
            ? payload?.payment?.status
            : type_1.IPaymentStatus.PENDING;
        if (user?.role !== type_2.IRole.ADMIN &&
            (payload?.payment?.transaction_id || payload?.payment?.order_id)) {
            const validPayment = (0, razorpay_utils_1.validatePaymentVerification)({
                order_id: payload?.payment?.order_id,
                payment_id: payload?.payment?.transaction_id,
            }, payload?.payment?.signature, process.env.RAZORPAY_API_SECRET);
            if (!validPayment) {
                throw new common_1.HttpException('Payment verification failed', common_1.HttpStatus.PAYMENT_REQUIRED);
            }
            paymentStatus = type_1.IPaymentStatus.COMPLETED;
        }
        const createPayload = {
            booking_id: (0, uuid_1.v7)(),
            customer_id: payload?.customer_id,
            doctor_id: payload?.doctor_id,
            date: bookingDate,
            service_id: payload?.service_id,
            slot_id: payload?.slot_id,
            status: type_1.IBookingStatus.PENDING,
            payment: {
                ephemeralId: payload?.payment?.ephemeralId || '',
                transaction_id: payload?.payment?.transaction_id || '',
                order_id: payload?.payment?.order_id || '',
                signature: payload?.payment?.signature || '',
                amount: user?.role === type_2.IRole.ADMIN && payload?.payment?.amount
                    ? payload?.payment?.amount
                    : service?.price_amount || 0,
                status: paymentStatus,
            },
            history: {
                created_at: new Date().toISOString(),
                created_by: user?.uid,
                created_by_role: user?.role,
                created_by_name: user?.name,
                confirmed_at: '',
                confirmed_by: '',
                confirmed_by_role: '',
                confirmed_by_name: '',
                canceled_at: '',
                canceled_by: '',
                canceled_by_role: '',
                canceled_by_name: '',
                completed_at: '',
                completed_by: '',
                completed_by_role: '',
                completed_by_name: '',
            },
        };
        if (createPayload?.doctor_id) {
            createPayload.doctor = fireStore.doc(`${this.firebaseService.collections.profiles}/${createPayload?.doctor_id}`);
        }
        if (createPayload?.customer_id) {
            createPayload.customer = fireStore.doc(`${this.firebaseService.collections.profiles}/${createPayload?.customer_id}`);
        }
        if (createPayload?.slot_id) {
            createPayload.slot = fireStore.doc(`${this.firebaseService.collections.availability_slots}/${createPayload?.slot_id}`);
        }
        if (createPayload?.service_id) {
            createPayload.service = fireStore.doc(`${this.firebaseService.collections.services}/${createPayload?.service_id}`);
        }
        createPayload.created_at = new Date().toISOString();
        await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(createPayload.booking_id)
            .create(createPayload);
        this.logger.log(createPayload, 'Booking Created');
        await this.firebaseNotification.sendNotificationByTopic(createPayload.customer_id, createPayload.doctor_id, (receiver, sender) => {
            return this.prepareBookingNotification(receiver, sender, createPayload, {});
        });
        return true;
    }
    async updateBooking(bookingId, filters, payload, user) {
        const fireStore = this.firebaseService.getFireStore();
        const bookingsDocs = await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(bookingId)
            .get();
        if (!bookingsDocs?.exists) {
            throw new common_1.HttpException('No booking found', common_1.HttpStatus.BAD_REQUEST);
        }
        const bookingData = bookingsDocs.data();
        if ((filters?.doctor_id && filters?.doctor_id !== bookingData.doctor_id) ||
            (filters?.customer_id && filters?.customer_id !== bookingData.customer_id)) {
            throw new common_1.HttpException('Invalid booking', common_1.HttpStatus.BAD_REQUEST);
        }
        if (bookingData?.status == type_1.IBookingStatus.COMPLETED &&
            [type_2.IRole.CUSTOMER, type_2.IRole.DOCTOR].includes(user?.role)) {
            throw new common_1.HttpException(`Its already ${type_1.IBookingStatus.COMPLETED}. So you can not updated it.`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user?.role === type_2.IRole.CUSTOMER &&
            payload.status == type_1.IBookingStatus.CANCELED &&
            bookingData?.status == type_1.IBookingStatus.CANCELED) {
            throw new common_1.HttpException(`Its already ${type_1.IBookingStatus.CANCELED}. So you can not ${type_1.IBookingStatus.CANCELED} it again.`, common_1.HttpStatus.BAD_REQUEST);
        }
        const updatePayload = {
            date: payload?.date || bookingData?.date,
            service_id: payload?.service_id || bookingData?.service_id,
            slot_id: payload?.slot_id || bookingData?.slot_id,
            status: payload?.status || bookingData?.status,
        };
        if (payload?.payment) {
            updatePayload.payment = {
                transaction_id: user?.role === type_2.IRole.ADMIN && payload?.payment?.transaction_id
                    ? payload?.payment?.transaction_id
                    : bookingData?.payment?.transaction_id || '',
                amount: user?.role === type_2.IRole.ADMIN && payload?.payment?.amount
                    ? payload?.payment?.amount
                    : bookingData?.payment?.amount || 0,
                status: user?.role === type_2.IRole.ADMIN && payload?.payment?.status
                    ? payload?.payment?.status
                    : bookingData?.payment?.status || type_1.IPaymentStatus.PENDING,
            };
        }
        const history = bookingData?.history || {};
        if (payload?.status && payload?.status == type_1.IBookingStatus.CONFIRMED) {
            updatePayload.history = {
                ...history,
                confirmed_at: new Date().toISOString(),
                confirmed_by: user?.uid,
                confirmed_by_role: user?.role,
                confirmed_by_name: user?.name,
            };
        }
        if (payload?.status && payload?.status == type_1.IBookingStatus.CANCELED) {
            updatePayload.history = {
                ...history,
                canceled_at: new Date().toISOString(),
                canceled_by: user?.uid,
                canceled_by_role: user?.role,
                canceled_by_name: user?.name,
            };
        }
        if (payload?.status && payload?.status == type_1.IBookingStatus.COMPLETED) {
            updatePayload.history = {
                ...history,
                completed_at: new Date().toISOString(),
                completed_by: user?.uid,
                completed_by_role: user?.role,
                completed_by_name: user?.name,
            };
        }
        if (payload?.slot_id) {
            updatePayload.slot = fireStore.doc(`${this.firebaseService.collections.availability_slots}/${updatePayload?.slot_id}`);
        }
        if (payload?.service_id) {
            updatePayload.service = fireStore.doc(`${this.firebaseService.collections.services}/${updatePayload?.service_id}`);
        }
        updatePayload.updated_at = new Date().toISOString();
        await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(bookingData?.booking_id)
            .set(updatePayload, { merge: true });
        this.logger.log(updatePayload, 'Booking Updated');
        await this.firebaseNotification.sendNotificationByToken(bookingData.customer_id, bookingData.doctor_id, (receiver, sender) => {
            return this.prepareBookingNotification(receiver, sender, updatePayload, bookingData);
        });
        return true;
    }
    async addBookingReview(bookingId, filters, payload, user) {
        const fireStore = this.firebaseService.getFireStore();
        const bookingsDocs = await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(bookingId)
            .get();
        if (!bookingsDocs?.exists) {
            throw new common_1.HttpException('No booking found', common_1.HttpStatus.NOT_FOUND);
        }
        const bookingData = bookingsDocs.data();
        if ((filters?.doctor_id && filters?.doctor_id !== bookingData.doctor_id) ||
            (filters?.customer_id && filters?.customer_id !== bookingData.customer_id)) {
            throw new common_1.HttpException('Invalid booking', common_1.HttpStatus.BAD_REQUEST);
        }
        if (bookingData?.status !== type_1.IBookingStatus.COMPLETED) {
            throw new common_1.HttpException(`Its not ${type_1.IBookingStatus.COMPLETED}. So you can not review it.`, common_1.HttpStatus.MISDIRECTED);
        }
        if (bookingData?.review?.datetime && user?.role === type_2.IRole.CUSTOMER) {
            throw new common_1.HttpException(`Your already rated it. So you can not rate again.`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!payload?.comment && !payload?.rating) {
            throw new common_1.HttpException('Review or Ratting is required.', common_1.HttpStatus.BAD_REQUEST);
        }
        const updatePayload = {
            review: {
                comment: payload?.comment,
                rating: payload?.rating,
                datetime: new Date().toISOString(),
            },
        };
        await fireStore
            .collection(this.firebaseService.collections.bookings)
            .doc(bookingData?.booking_id)
            .set(updatePayload, { merge: true });
        const doctorDocs = await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(bookingData.doctor_id)
            .get();
        if (doctorDocs?.exists) {
            const doctorProfile = doctorDocs.data();
            const ratingsData = Array.isArray(doctorProfile?.ratings)
                ? doctorProfile?.ratings
                : [];
            ratingsData.push(payload?.rating);
            await fireStore
                .collection(this.firebaseService.collections.profiles)
                .doc(bookingData.doctor_id)
                .set({ ratings: ratingsData }, { merge: true });
        }
        this.logger.log('Booking Rated', updatePayload);
        return true;
    }
    prepareBookingNotification(receiver, sender, currentData = {}, oldData = {}) {
        currentData = {
            ...oldData,
            ...currentData,
        };
        let actions = [];
        if ([type_1.IBookingStatus.PENDING, type_1.IBookingStatus.CONFIRMED].includes(currentData?.status)) {
            actions = ['reschedule', 'cancel'];
        }
        if ([type_1.IBookingStatus.CANCELED].includes(currentData?.status)) {
            actions = ['reschedule'];
        }
        if ([type_1.IBookingStatus.COMPLETED].includes(currentData?.status)) {
            actions = ['rate'];
        }
        const action_type = oldData?.booking_id ? 'Updated' : 'Created';
        let title = `Booking ${action_type}`;
        let body = `${receiver?.display_name} your booking with ${sender?.display_name} has been ${action_type.toLocaleLowerCase()}`;
        if (oldData?.date !== currentData.date ||
            oldData?.slot_id !== currentData.slot_id) {
            title = `Booking Schedule ${action_type}`;
            body = `${receiver?.display_name} your booking with ${sender?.display_name} has been rescheduled to ${currentData?.date}`;
        }
        if (oldData?.status !== currentData.status) {
            title = `Booking Status ${action_type}`;
            body =
                currentData.status === type_1.IBookingStatus.COMPLETED
                    ? `${receiver?.display_name} your booking with ${sender?.display_name} has been ${currentData?.status}. Please let us know how the check-up went.`
                    : `${receiver?.display_name} your booking with ${sender?.display_name} on ${currentData?.date} has been ${currentData?.status}.`;
        }
        return {
            notification: {
                title,
                body,
            },
            context: {
                booking_id: currentData?.booking_id,
                doctor_id: currentData?.doctor_id,
                customer_id: currentData?.customer_id,
                type: `booking_${action_type.toLocaleLowerCase()}`,
                actions,
            },
        };
    }
    async createBookingPayment(payload) {
        const fireStore = this.firebaseService.getFireStore();
        const profile = (await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(payload?.customer_id)
            .get()).data();
        if (!profile) {
            throw new common_1.HttpException('Customer not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const service = (await fireStore
            .collection(this.firebaseService.collections.services)
            .doc(payload?.service_id)
            .get()).data();
        if (!service) {
            throw new common_1.HttpException('Service not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const paymentInstance = new razorpay_1.default({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_API_SECRET,
        });
        const result = await paymentInstance.orders.create({
            amount: +service?.price_amount * 100,
            currency: 'INR',
            receipt: profile.uid,
            partial_payment: false,
            notes: {
                serviceId: service?.service_id,
                customerId: profile.uid,
                doctorId: payload?.doctor_id,
            },
        });
        if (!result?.id) {
            this.logger.log(result, 'Payment order error');
            throw new common_1.HttpException('Failed to generate order', common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        this.logger.log(result, 'Payment order result');
        return {
            key: process.env.RAZORPAY_API_KEY,
            order_id: result?.id,
            name: process.env.APP_NAME,
            amount: result?.amount,
            currency: result?.currency,
            description: service?.name,
            prefill: {
                email: profile?.email,
                contact: profile?.phone,
                name: profile?.display_name,
            },
            theme: {
                color: '#18A0FB',
            },
            notes: {
                orderId: result?.id,
                serviceId: service?.service_id,
                customerId: profile.uid,
                doctorId: payload?.doctor_id,
            },
        };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        firebase_notification_service_1.FirebaseNotificationService])
], BookingService);
//# sourceMappingURL=booking.service.js.map