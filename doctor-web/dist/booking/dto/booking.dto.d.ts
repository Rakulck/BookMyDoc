import { IBookingStatus } from '../type';
import { AvailabilitySlot } from '@app/availability/dto/availability.dto';
import { ProfileDto } from '@app/profile/dto/profile.dto';
import { PaymentDto } from './payment.dto';
import { ReviewDto } from './review.dto';
export declare class ServiceDto {
    service_id: string;
    name: string;
    description: string;
    type: string;
    price_amount: number | string;
}
export declare class BookingDto {
    booking_id: string;
    customer_id: string;
    doctor_id: string;
    service_id: string;
    slot_id: string;
    status: IBookingStatus;
    date: string;
    customer: ProfileDto;
    doctor: ProfileDto;
    service: ServiceDto;
    slot: AvailabilitySlot;
    payment: PaymentDto;
    review: ReviewDto;
    history: Record<string, any>;
    created_at: string;
    updated_at?: string;
}
export declare class BookingCreateDto {
    customer_id: string;
    doctor_id: string;
    service_id: string;
    slot_id: string;
    date: string;
    payment: PaymentDto;
    created_at?: string;
}
export declare class BookingUpdateDto {
    customer_id: string;
    doctor_id: string;
    service_id: string;
    slot_id: string;
    status: IBookingStatus;
    date: string;
    payment: PaymentDto;
    created_at?: string;
    updated_at?: string;
}
