import { IBookingStatus } from '../type';
export declare class BookingFilterDto {
    customer_id?: string;
    doctor_id?: string;
    status?: IBookingStatus;
    date?: string;
    order_by?: 'asc' | 'desc';
}
