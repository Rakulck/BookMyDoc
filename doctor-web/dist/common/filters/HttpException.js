"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleHttpException = HandleHttpException;
function HandleHttpException(exception) {
    const exceptionResp = exception.getResponse();
    const message = typeof exceptionResp === 'string'
        ? exceptionResp
        : exceptionResp?.message;
    const extra = exception?.cause;
    return { code: exception.getStatus(), message, extra };
}
//# sourceMappingURL=HttpException.js.map