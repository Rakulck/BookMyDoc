import { AvailabilityService } from './availability.service';
import { AvailabilitySlot } from './dto/availability.dto';
export declare class AvailabilityController {
    private readonly availabilityService;
    constructor(availabilityService: AvailabilityService);
    getAvailabilitySlots(req: any, query: any): Promise<any>;
    saveAvailabilitySlots(req: any, body: AvailabilitySlot[]): Promise<any[]>;
}
