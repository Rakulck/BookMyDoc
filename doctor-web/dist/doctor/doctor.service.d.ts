import { FirebaseService } from '@app/firebase/firebase.service';
import { IRole } from '@app/common/types/type';
import { DoctorFilterDto } from './dto/filters.dto';
import { DoctorDto } from './dto/doctor.dto';
export declare class DoctorService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    isFindFilterDoctor(data: any, filters: any): boolean;
    isFindSearchDoctor(data: any, filters: any): boolean;
    getDoctors(filters?: DoctorFilterDto, userRole?: IRole): Promise<any[]>;
    getDoctorDetails(doctorId: string, userRole?: IRole): Promise<DoctorDto>;
}
