import { UserService } from './user.service';
import { IApiResponse, IUnsafeObject } from '@common/types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<IApiResponse<IUnsafeObject>>;
    authCheck(req: any): Promise<IApiResponse<IUnsafeObject>>;
}
