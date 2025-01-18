import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { IApiResponse, IUnsafeObject } from '@common/types';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<IApiResponse<IUnsafeObject>>;
    updateProfile(req: any, profileDto: ProfileDto, file?: Express.Multer.File): Promise<IApiResponse<IUnsafeObject>>;
}
