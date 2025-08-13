import { FirebaseService } from '../firebase/firebase.service';
import { ProfileDto } from './dto/profile.dto';
import { IApiResponse, IUnsafeObject } from '@common/types';
import 'multer';
export declare class ProfileService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    private getServicesByIds;
    getProfile(userId: string): Promise<IApiResponse<IUnsafeObject>>;
    updateProfile(userId: string, profileDto: ProfileDto, file?: Express.Multer.File): Promise<IApiResponse<IUnsafeObject>>;
}
