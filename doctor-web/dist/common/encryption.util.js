"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptData = encryptData;
exports.decryptData = decryptData;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const key = crypto_1.default
    .createHash('sha512')
    .update(process.env.ENCRYPTION_SECRET_KEY)
    .digest('hex')
    .substring(0, 32);
const encryptionIV = crypto_1.default
    .createHash('sha512')
    .update(process.env.ENCRYPTION_SECRET_KEY + '_vi')
    .digest('hex')
    .substring(0, 16);
function encryptData(data) {
    const cipher = crypto_1.default.createCipheriv(algorithm, key, encryptionIV);
    return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
}
function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, encryptionIV);
    return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8'));
}
//# sourceMappingURL=encryption.util.js.map