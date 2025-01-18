import { HttpException } from '@nestjs/common';
import { IApiError } from '@common/types';
export declare function HandleHttpException(exception: HttpException): IApiError;
