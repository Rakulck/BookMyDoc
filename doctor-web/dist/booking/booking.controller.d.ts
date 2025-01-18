import { BookingService } from './booking.service';
import { BookingUpdateDto, BookingCreateDto } from './dto/booking.dto';
import { CreatePaymentDto } from './dto/payment.dto';
import { ReviewDto } from './dto/review.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    getBookings(req: any, query: any): Promise<any[]>;
    getBooking(bookingId: string, req: any): Promise<any>;
    createBookingPayment(req: any, body: CreatePaymentDto): Promise<{
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
    createBooking(req: any, body: BookingCreateDto): Promise<boolean>;
    updateBooking(bookingId: string, req: any, body: BookingUpdateDto): Promise<boolean>;
    addBookingReview(bookingId: string, req: any, body: ReviewDto): Promise<boolean>;
}
