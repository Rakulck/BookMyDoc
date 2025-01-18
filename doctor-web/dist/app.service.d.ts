import { FirebaseService } from '@app/firebase/firebase.service';
export declare class AppService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getFacts(reset?: boolean): Promise<any[]>;
}
