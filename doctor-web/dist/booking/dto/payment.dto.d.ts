import { IPaymentStatus } from '../type';
export declare class PaymentDto {
    ephemeralId: string;
    transaction_id: string;
    order_id: string;
    signature: string;
    amount: number | string;
    status: IPaymentStatus;
}
export declare class CreatePaymentDto {
    customer_id: string;
    doctor_id: string;
    service_id: string;
}
