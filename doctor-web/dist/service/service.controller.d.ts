import { ServiceService } from './service.service';
import { ServiceDto } from './dto/create-service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    findAll(): Promise<{
        message: string;
        data: {
            id: string;
        }[];
    }>;
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
    remove(id: string): Promise<void>;
}
