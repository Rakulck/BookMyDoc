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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase/firebase.service");
const FactsModel_data_1 = __importDefault(require("./data/FactsModel.data"));
const uuid_1 = require("uuid");
let AppService = class AppService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async getFacts(reset = false) {
        const fireStore = this.firebaseService.getFireStore();
        const factsRef = await fireStore
            .collection(this.firebaseService.collections.health_tips)
            .where('enable', '==', true)
            .get();
        if (reset && factsRef.empty) {
            const batch = fireStore.batch();
            FactsModel_data_1.default.forEach((fact) => {
                const factId = String((0, uuid_1.v7)());
                const docRef = fireStore
                    .collection(this.firebaseService.collections.health_tips)
                    .doc(factId);
                batch.create(docRef, {
                    id: factId,
                    enable: true,
                    fact: fact.fact,
                });
            });
            batch.commit();
        }
        let facts = factsRef.docs.map((doc) => doc.data());
        facts = facts.sort(() => 0.5 - Math.random()).slice(0, 5);
        return facts;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], AppService);
//# sourceMappingURL=app.service.js.map