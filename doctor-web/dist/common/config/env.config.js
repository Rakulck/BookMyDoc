"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigOptions = getConfigOptions;
function getConfigOptions(schema) {
    return {
        cache: true,
        isGlobal: true,
        validate: process.env.NODE_ENV === 'test' ? undefined : (env) => schema.parse(env),
    };
}
//# sourceMappingURL=env.config.js.map