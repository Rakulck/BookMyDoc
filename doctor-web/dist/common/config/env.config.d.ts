import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';
export declare function getConfigOptions<T extends z.ZodRawShape>(schema: z.ZodObject<T>): ConfigModuleOptions;
