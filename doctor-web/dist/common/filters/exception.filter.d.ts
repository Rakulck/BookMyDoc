import { ArgumentsHost, ExceptionFilter as NestExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
export declare class ExceptionFilter implements NestExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: Error, host: ArgumentsHost): Response;
}
