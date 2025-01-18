import { Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { IUnsafeObject } from '@app/common/types';
export declare class FirebaseNotificationService {
    private readonly firebaseService;
    logger: Logger;
    constructor(firebaseService: FirebaseService);
    sendNotificationByTopic(receiverId: string, senderId: string, notificationFunc: (receiver: IUnsafeObject<any>, sender: IUnsafeObject<any>) => IUnsafeObject<any>): Promise<void>;
    sendNotificationByToken(receiverId: string, senderId: string, notificationFunc: (receiver: IUnsafeObject<any>, sender: IUnsafeObject<any>) => IUnsafeObject<any>): Promise<void>;
}
