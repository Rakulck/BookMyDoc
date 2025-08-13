import { ProfileService } from './profile.service';
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
import { ProfileDto } from './dto/profile.dto';
import { IApiResponse, IUnsafeObject } from '@common/types';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<IApiResponse<IUnsafeObject>>;
    updateProfile(req: any, profileDto: ProfileDto, file?: MulterFile): Promise<IApiResponse<IUnsafeObject>>;
}
export {};
