import { HttpStatus } from '@nestjs/common';

export type IUnsafeObject<T = unknown> = Record<string, T>;

export interface IApiError {
  message: string;
  code?: number;
  extra?: IUnsafeObject | string | (IUnsafeObject | string)[];
}

export type IApiResError = IApiError | string | null;

export interface IApiResponseMetadata extends IUnsafeObject {
  timestamp: string;
}

export interface IApiResponse<T = unknown> {
  metadata?: IApiResponseMetadata;
  error?: IApiResError;
  statusCode: HttpStatus;
  data: T;
  message: string;
  success?: boolean;
}
