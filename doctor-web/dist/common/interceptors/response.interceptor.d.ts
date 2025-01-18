import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IApiResError, IApiResponse, IUnsafeObject } from '@common/types';
export declare class ApiResponseFormat implements IApiResponse {
    metadata: {
        timestamp: string;
    };
    statusCode: HttpStatus;
    success: boolean;
    error?: IApiResError;
    data: IUnsafeObject | null;
    message: string;
    constructor(response: IApiResponse<IUnsafeObject>, statusCode?: HttpStatus);
}
export declare class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse>;
}
