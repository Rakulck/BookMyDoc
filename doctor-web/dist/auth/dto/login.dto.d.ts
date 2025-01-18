export declare class LoginDto {
    token: string;
    provider?: 'google' | 'apple' | false;
    role: 'admin' | 'doctor' | 'customer';
}
