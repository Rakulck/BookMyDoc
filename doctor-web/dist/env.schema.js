"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_ENV = exports.envSchema = void 0;
exports.setTestEnv = setTestEnv;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    HOSTNAME: zod_1.z.string(),
    PORT: zod_1.z.coerce.number(),
    NODE_ENV: zod_1.z.string(),
});
exports.TEST_ENV = {
    HOSTNAME: 'localhost',
    PORT: 8080,
    NODE_ENV: 'test',
};
function setTestEnv(custom) {
    for (const [key, value] of Object.entries(custom ?? exports.TEST_ENV)) {
        process.env[key] = String(value);
    }
}
//# sourceMappingURL=env.schema.js.map