import { AddressDto } from './address.dto';
export declare class ProfileDto {
    display_name?: string;
    user_name?: string;
    email?: string;
    stripe_id?: string;
    role?: string;
    phone?: string;
    title?: string;
    photoUrl?: string;
    bio?: string;
    gender?: string;
    age?: number;
    experience?: string;
    expertiseList?: string[];
    services?: string[];
    location?: AddressDto;
    height?: number;
    weight?: number;
    blood_group?: string;
    dob?: string;
    notification_enabled?: boolean;
    notification_tokens?: any;
    createdAt?: string;
    updatedAt?: string;
}
