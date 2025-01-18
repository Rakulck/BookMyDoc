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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const uuid_1 = require("uuid");
let ServiceService = class ServiceService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async create(createServiceDto) {
        try {
            const serviceRef = this.firebaseService
                .getFirestore()
                .collection('services')
                .doc();
            const serviceId = String(serviceRef.id || (0, uuid_1.v7)());
            const serviceData = {
                service_id: serviceId,
                ...createServiceDto,
            };
            await serviceRef.set(serviceData);
            return {
                message: 'Service created successfully',
                data: serviceData,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create service: ${error.message}`);
            }
            else {
                throw new Error('Failed to create service: Unknown error');
            }
        }
    }
    async findAll() {
        try {
            const servicesCollectionRef = this.firebaseService
                .getFirestore()
                .collection('services');
            const snapshot = await servicesCollectionRef.get();
            if (snapshot.empty) {
                return {
                    message: 'No services found',
                    data: [],
                };
            }
            const services = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return {
                message: 'Services retrieved successfully',
                data: services,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve services: ${error.message}`);
            }
            else {
                throw new Error('Failed to retrieve services: Unknown error');
            }
        }
    }
    async remove(id) {
        try {
            const serviceRef = this.firebaseService
                .getFirestore()
                .collection('services')
                .doc(id.toString());
            const serviceDoc = await serviceRef.get();
            if (!serviceDoc.exists) {
                throw new Error(`Service with ID ${id} not found`);
            }
            await serviceRef.delete();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to remove service: ${error.message}`);
            }
            else {
                throw new Error('Failed to remove service: Unknown error');
            }
        }
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], ServiceService);
//# sourceMappingURL=service.service.js.map