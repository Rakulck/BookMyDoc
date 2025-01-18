export declare enum IDay {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}
export interface IAvailabilitySlot {
    slot_id: string;
    uid: string;
    day: IDay;
    start_time: string;
    end_time: string;
    duration: number;
    created_at?: string;
    updated_at?: string;
}
export declare const DAYS_Of_WEEK: string[];