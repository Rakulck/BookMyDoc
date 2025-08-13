import { IRole } from '@app/common/types/type';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: IRole[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const RoleGuard: (...roles: IRole[]) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
