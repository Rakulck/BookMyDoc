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
exports.FirebaseNotificationService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("./firebase.service");
let FirebaseNotificationService = class FirebaseNotificationService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async sendNotificationByTopic(receiverId, senderId, notificationFunc) {
        try {
            const fireStore = this.firebaseService.getFireStore();
            const receiver = (await fireStore
                .collection(this.firebaseService.collections.profiles)
                .doc(receiverId)
                .get()).data();
            if (!receiver?.notification_enabled) {
                return;
            }
            const sender = (await fireStore
                .collection(this.firebaseService.collections.profiles)
                .doc(senderId)
                .get()).data();
            const { notification, context } = notificationFunc(receiver, sender);
            const data = {
                receiver: JSON.stringify({
                    uid: receiver?.uid,
                    name: receiver?.display_name,
                    role: receiver?.role,
                }),
                sender: JSON.stringify({
                    uid: sender?.uid,
                    name: sender?.display_name,
                    role: sender?.role,
                }),
                context: JSON.stringify(context),
            };
            const result = await this.firebaseService.getMessage().send({
                topic: 'booking',
                data,
                notification,
                apns: {
                    payload: {
                        aps: {
                            contentAvailable: true,
                            priority: 'high',
                        },
                    },
                },
                android: {
                    priority: 'high',
                },
            });
            this.logger.log(JSON.stringify(result), 'Notification Send');
        }
        catch (error) {
            this.logger.error(error, 'notification error');
        }
    }
    async sendNotificationByToken(receiverId, senderId, notificationFunc) {
        try {
            const fireStore = this.firebaseService.getFireStore();
            const receiver = (await fireStore
                .collection(this.firebaseService.collections.profiles)
                .doc(receiverId)
                .get()).data();
            if (!receiver?.notification_enabled) {
                return;
            }
            const sender = (await fireStore
                .collection(this.firebaseService.collections.profiles)
                .doc(senderId)
                .get()).data();
            const { notification, context } = notificationFunc(receiver, sender);
            const data = {
                receiver: JSON.stringify({
                    uid: receiver?.uid,
                    display_name: receiver?.display_name,
                    role: receiver?.role,
                }),
                sender: JSON.stringify({
                    uid: sender?.uid,
                    display_name: sender?.display_name,
                    role: sender?.role,
                }),
                context: JSON.stringify(context),
            };
            const result = await this.firebaseService
                .getMessage()
                .sendEachForMulticast({
                tokens: Array.isArray(receiver?.notification_tokens)
                    ? receiver?.notification_tokens
                    : [],
                data,
                notification,
                apns: {
                    payload: {
                        aps: {
                            contentAvailable: true,
                            priority: 'high',
                        },
                    },
                },
                android: {
                    priority: 'high',
                },
            });
            this.logger.log(JSON.stringify(result), 'Notification Send');
        }
        catch (error) {
            this.logger.error(error, 'notification error');
        }
    }
};
exports.FirebaseNotificationService = FirebaseNotificationService;
exports.FirebaseNotificationService = FirebaseNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseNotificationService);
//# sourceMappingURL=firebase-notification.service.js.map