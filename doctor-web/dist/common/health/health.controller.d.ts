import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getReady(): {
        ready: boolean;
    };
    getLiveness(): {
        live: boolean;
    };
}
