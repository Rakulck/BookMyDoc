import { ServiceDto } from './dto/create-service.dto';
import { FirebaseService } from '../firebase/firebase.service';
export declare class ServiceService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createServiceDto: ServiceDto): Promise<{
        message: string;
        data: {
            name: string;
            description: string;
            type: string;
            price_amount: number;
            icon_name: string;
            service_id: string;
        };
    }>;
    findAll(): Promise<{
        message: string;
        data: {
            id: string;
        }[];
    }>;
    remove(id: number): Promise<void>;
}
