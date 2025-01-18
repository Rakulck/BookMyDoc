import { FirebaseService } from '../firebase/firebase.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IApiResponse, IUnsafeObject } from '@common/types';
export declare class AuthService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    private verifyProviderToken;
    private generateToken;
    private roleChecker;
    private generateUniqueUserName;
    private generateUserName;
    register({ name, email, password, role, token, provider, }: RegisterDto): Promise<IApiResponse<IUnsafeObject>>;
    login({ token, role, provider, }: LoginDto): Promise<IApiResponse<IUnsafeObject>>;
    verifyUserProfileEmail(stateCode: string): Promise<IApiResponse<IUnsafeObject>>;
}
