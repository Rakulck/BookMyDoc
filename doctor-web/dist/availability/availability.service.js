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
exports.AvailabilityService = void 0;
const firebase_service_1 = require("../firebase/firebase.service");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("../common/utils");
let AvailabilityService = class AvailabilityService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getAvailabilitySlots(filters) {
        const fireStore = this.firebaseService.getFireStore();
        let availabilitySlots = fireStore.collection(this.firebaseService.collections.availability_slots);
        if (filters?.doctorId) {
            availabilitySlots = availabilitySlots.where('uid', '==', filters?.doctorId);
        }
        if (filters?.day) {
            availabilitySlots = availabilitySlots.where('day', '==', filters?.day);
        }
        availabilitySlots = await availabilitySlots.get();
        return availabilitySlots.docs.map((doc) => doc.data());
    }
    async saveAvailabilitySlots(doctorId, payload) {
        const fireStore = this.firebaseService.getFireStore();
        const deleteBatch = fireStore.batch();
        const currentRef = await fireStore
            .collection(this.firebaseService.collections.availability_slots)
            .where('uid', '==', doctorId)
            .get();
        currentRef.forEach((doc) => deleteBatch.delete(doc.ref));
        await deleteBatch.commit();
        const batch = fireStore.batch();
        const availabilitySlots = [];
        const availabilityDays = [];
        for (const slot of payload) {
            const slotId = String(slot?.slot_id || (0, uuid_1.v7)());
            const docRef = fireStore
                .collection(this.firebaseService.collections.availability_slots)
                .doc(slotId);
            if (!slot?.day || !doctorId || !slot?.start_time || !slot?.end_time) {
                continue;
            }
            const startTime = (0, utils_1.validateTime)(slot?.start_time);
            const endTime = (0, utils_1.validateTime)(slot?.end_time);
            const duration = (new Date(0, 0, 0, +endTime?.hours, +endTime?.minutes).getTime() -
                new Date(0, 0, 0, +startTime?.hours, +startTime?.minutes).getTime()) /
                1000 /
                60;
            const day = slot?.day.toLocaleLowerCase();
            const slotDoc = {
                slot_id: slotId,
                uid: doctorId,
                day,
                duration: duration,
                start_time: `${startTime?.hours}:${startTime?.minutes}`,
                end_time: `${endTime?.hours}:${endTime?.minutes}`,
            };
            if (!availabilityDays.includes(day)) {
                availabilityDays.push(day);
            }
            availabilitySlots.push(slotDoc);
            batch.create(docRef, slotDoc);
        }
        await batch.commit();
        await fireStore
            .collection(this.firebaseService.collections.profiles)
            .doc(doctorId)
            .set({
            availability: availabilityDays,
            availabilitySlots: JSON.stringify(availabilitySlots),
        }, { merge: true });
        return availabilitySlots;
    }
};
exports.AvailabilityService = AvailabilityService;
exports.AvailabilityService = AvailabilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], AvailabilityService);
//# sourceMappingURL=availability.service.js.map