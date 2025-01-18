import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: RegisterDto): Promise<import("../common/types").IApiResponse<import("../common/types").IUnsafeObject>>;
    login(body: LoginDto): Promise<import("../common/types").IApiResponse<import("../common/types").IUnsafeObject>>;
    verifyUserProfile(body: any): Promise<import("../common/types").IApiResponse<import("../common/types").IUnsafeObject>>;
}
