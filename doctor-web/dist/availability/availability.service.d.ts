import { FirebaseService } from '@app/firebase/firebase.service';
import { IAvailabilitySlot } from './type';
export declare class AvailabilityService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getAvailabilitySlots(filters?: any): Promise<any>;
    saveAvailabilitySlots(doctorId: string, payload: IAvailabilitySlot[]): Promise<any[]>;
}
