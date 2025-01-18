import { FirebaseService } from '@app/firebase/firebase.service';
import { Logger } from '@nestjs/common';
import { BookingFilterDto } from '@app/booking/dto/filters.dto';
import { BookingCreateDto, BookingUpdateDto } from '@app/booking/dto/booking.dto';
import { IUnsafeObject } from '@app/common/types';
import { CreatePaymentDto } from './dto/payment.dto';
import { IRole } from '@app/common/types/type';
import { FirebaseNotificationService } from '@app/firebase/firebase-notification.service';
import { ReviewDto } from './dto/review.dto';
export declare class BookingService {
    private readonly firebaseService;
    private readonly firebaseNotification;
    logger: Logger;
    constructor(firebaseService: FirebaseService, firebaseNotification: FirebaseNotificationService);
    getBookings(filters: BookingFilterDto, userRole?: IRole): Promise<any[]>;
    getSingleBooking(bookingId: string, filters?: BookingFilterDto, userRole?: IRole): Promise<any>;
    createBooking(payload: BookingCreateDto, user: any): Promise<boolean>;
    updateBooking(bookingId: string, filters: BookingFilterDto, payload: BookingUpdateDto, user: any): Promise<boolean>;
    addBookingReview(bookingId: string, filters: BookingFilterDto, payload: ReviewDto, user: any): Promise<boolean>;
    prepareBookingNotification(receiver: IUnsafeObject<any>, sender: IUnsafeObject<any>, currentData?: IUnsafeObject<any>, oldData?: IUnsafeObject<any>): {
        notification: {
            title: string;
            body: string;
        };
        context: {
            booking_id: any;
            doctor_id: any;
            customer_id: any;
            type: string;
            actions: any[];
        };
    };
    createBookingPayment(payload: CreatePaymentDto): Promise<{
        key: string;
        order_id: any;
        name: string;
        amount: any;
        currency: any;
        description: any;
        prefill: {
            email: any;
            contact: any;
            name: any;
        };
        theme: {
            color: string;
        };
        notes: {
            orderId: any;
            serviceId: any;
            customerId: any;
            doctorId: string;
        };
    }>;
}
