export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'doctor' | 'customer';
    token?: string;
    provider?: 'google' | 'apple' | false;
}
