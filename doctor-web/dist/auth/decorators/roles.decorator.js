"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../guard/roles.guard");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
const RoleGuard = (...roles) => {
    return (0, common_1.applyDecorators)((0, exports.Roles)(...roles), (0, common_1.UseGuards)(roles_guard_1.RolesGuard));
};
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=roles.decorator.js.map