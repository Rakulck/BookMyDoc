"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_module_1 = require("../firebase/firebase.module");
const availability_service_1 = require("./availability.service");
const availability_controller_1 = require("./availability.controller");
let AvailabilityModule = class AvailabilityModule {
};
exports.AvailabilityModule = AvailabilityModule;
exports.AvailabilityModule = AvailabilityModule = __decorate([
    (0, common_1.Module)({
        imports: [firebase_module_1.FirebaseModule],
        providers: [availability_service_1.AvailabilityService],
        controllers: [availability_controller_1.AvailabilityController],
    })
], AvailabilityModule);
//# sourceMappingURL=availability.module.js.map