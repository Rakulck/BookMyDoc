import { IDay } from '../type';
import { ProfileDto } from '@app/profile/dto/profile.dto';
import { AvailabilitySlot } from '@app/availability/dto/availability.dto';
import { BookingDto, ServiceDto } from '@app/booking/dto/booking.dto';
export declare class DoctorDto extends ProfileDto {
    ratings: [number];
    star_rating: number;
    providingServices?: ServiceDto[];
    availability?: IDay[];
    availabilitySlots?: AvailabilitySlot[];
    bookings?: BookingDto[];
}
