import { FirebaseService } from '../firebase/firebase.service';
import { ProfileDto } from './dto/profile.dto';
import { IApiResponse, IUnsafeObject } from '@common/types';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
export declare class ProfileService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    private getServicesByIds;
    getProfile(userId: string): Promise<IApiResponse<IUnsafeObject>>;
    updateProfile(userId: string, profileDto: ProfileDto, file?: MulterFile): Promise<IApiResponse<IUnsafeObject>>;
}
export {};
