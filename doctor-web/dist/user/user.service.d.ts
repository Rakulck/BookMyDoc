import { FirebaseService } from '../firebase/firebase.service';
import { IApiResponse, IUnsafeObject } from '@common/types';
export declare class UserService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    logout(userId: string): Promise<IApiResponse<IUnsafeObject>>;
    userAuthChecker(userId: string): Promise<IApiResponse<IUnsafeObject>>;
}
