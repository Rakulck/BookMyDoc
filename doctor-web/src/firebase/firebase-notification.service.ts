import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { IUnsafeObject } from '@app/common/types';

@Injectable()
export class FirebaseNotificationService {
  logger: Logger;
  constructor(private readonly firebaseService: FirebaseService) {
    this.logger = new Logger(this.constructor.name);
  }

  async sendNotificationByTopic(
    receiverId: string,
    senderId: string,
    notificationFunc: (
      receiver: IUnsafeObject<any>,
      sender: IUnsafeObject<any>,
    ) => IUnsafeObject<any>,
  ) {
    try {
      // Get the owners details
      const fireStore = this.firebaseService.getFireStore();
      const receiver: any = (
        await fireStore
          .collection(this.firebaseService.collections.profiles)
          .doc(receiverId)
          .get()
      ).data();

      if (!receiver?.notification_enabled) {
        return;
      }

      const sender: any = (
        await fireStore
          .collection(this.firebaseService.collections.profiles)
          .doc(senderId)
          .get()
      ).data();

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

      // console.log({
      //   data,
      //   notification,
      //   token: receiver?.notification_tokens,
      // });

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
    } catch (error) {
      this.logger.error(error, 'notification error');
    }
  }

  async sendNotificationByToken(
    receiverId: string,
    senderId: string,
    notificationFunc: (
      receiver: IUnsafeObject<any>,
      sender: IUnsafeObject<any>,
    ) => IUnsafeObject<any>,
  ) {
    try {
      // Get the owners details
      const fireStore = this.firebaseService.getFireStore();
      const receiver: any = (
        await fireStore
          .collection(this.firebaseService.collections.profiles)
          .doc(receiverId)
          .get()
      ).data();

      if (!receiver?.notification_enabled) {
        return;
      }

      const sender: any = (
        await fireStore
          .collection(this.firebaseService.collections.profiles)
          .doc(senderId)
          .get()
      ).data();

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

      // console.log({
      //   data,
      //   notification,
      //   tokens: receiver?.notification_tokens,
      // });

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
    } catch (error) {
      this.logger.error(error, 'notification error');
    }
  }
}
