import { IDay } from '../type';
export declare class AvailabilitySlot {
    slot_id: string;
    uid: string;
    day: IDay;
    start_time: string;
    end_time: string;
    duration: number;
    created_at?: string;
    updated_at?: string;
}
