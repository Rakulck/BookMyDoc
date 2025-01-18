import { DoctorService } from './doctor.service';
import { DoctorFilterDto } from './dto/filters.dto';
import { DoctorDto } from './dto/doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    getDoctors(req: any, query: DoctorFilterDto): Promise<any[]>;
    getDoctorDetails(req: any, doctorId: string): Promise<DoctorDto>;
}
