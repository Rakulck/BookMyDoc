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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
const firebase_service_1 = require("../firebase/firebase.service");
const class_transformer_1 = require("class-transformer");
let ProfileService = class ProfileService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getServicesByIds(serviceIds) {
        const services = await this.firebaseService
            .getFirestore()
            .collection('services')
            .where('service_id', 'in', serviceIds.map((id) => id))
            .get();
        return services.docs.map((doc) => doc.data());
    }
    async getProfile(userId) {
        try {
            const firestore = this.firebaseService.getFirestore();
            const profileDoc = await firestore
                .collection('profiles')
                .doc(userId)
                .get();
            if (!profileDoc.exists) {
                return {
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: 'Profile not found',
                    data: null,
                };
            }
            const profileData = profileDoc.data() || {};
            const serviceIds = profileData.services || [];
            let services = [];
            if (serviceIds.length > 0) {
                services = await this.getServicesByIds(serviceIds);
            }
            const profileDataWithServices = {
                ...profileData,
                services,
            };
            return {
                message: 'Profile fetched successfully',
                statusCode: common_1.HttpStatus.OK,
                data: profileDataWithServices,
            };
        }
        catch (error) {
            console.error('Error fetching profile:', error);
            return {
                message: 'An error occurred while fetching the profile',
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
            };
        }
    }
    async updateProfile(userId, profileDto, file) {
        try {
            let photoUrl = profileDto?.photoUrl;
            if (file && file !== undefined) {
                const bucket = this.firebaseService.getStorage().bucket();
                const fileName = `${userId}/${Date.now()}-${file.originalname}`;
                const fileUpload = bucket.file(fileName);
                await fileUpload.save(file.buffer, {
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
                const [downloadURL] = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-09-3000',
                });
                photoUrl = downloadURL;
            }
            let updatedProfile = { ...profileDto };
            if (photoUrl) {
                updatedProfile = {
                    ...profileDto,
                    photoUrl,
                };
            }
            if (profileDto.location && typeof profileDto.location === 'string') {
                try {
                    updatedProfile.location = JSON.parse(profileDto.location);
                }
                catch (error) {
                    console.error('Error parsing location:', error);
                    throw new Error('Invalid location format');
                }
            }
            if (profileDto.expertiseList &&
                typeof profileDto.expertiseList === 'string') {
                try {
                    updatedProfile.expertiseList = JSON.parse(profileDto.expertiseList);
                }
                catch (error) {
                    console.error('Error parsing expertiseList:', error);
                    throw new Error('Invalid expertiseList format');
                }
            }
            if (profileDto.services && typeof profileDto.services === 'string') {
                try {
                    updatedProfile.services = JSON.parse(profileDto.services);
                }
                catch (error) {
                    console.error('Error parsing services:', error);
                    throw new Error('Invalid services format');
                }
            }
            const updatedProfilePlain = (0, class_transformer_1.classToPlain)(updatedProfile);
            if (profileDto?.notification_tokens &&
                profileDto?.notification_tokens !== '') {
                updatedProfilePlain.notification_tokens = firestore_1.FieldValue.arrayUnion(updatedProfilePlain?.notification_tokens);
            }
            else {
                delete updatedProfilePlain?.notification_tokens;
            }
            await this.firebaseService
                .getFirestore()
                .collection('profiles')
                .doc(userId)
                .set(updatedProfilePlain, { merge: true });
            return {
                message: 'Profile updated successfully',
                statusCode: common_1.HttpStatus.OK,
                data: updatedProfilePlain,
            };
        }
        catch (error) {
            return {
                message: 'An error occurred while updating the profile',
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                error: error,
            };
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map