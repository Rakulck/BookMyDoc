import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    HOSTNAME: z.ZodString;
    PORT: z.ZodNumber;
    NODE_ENV: z.ZodString;
}, "strip", z.ZodTypeAny, {
    HOSTNAME?: string;
    PORT?: number;
    NODE_ENV?: string;
}, {
    HOSTNAME?: string;
    PORT?: number;
    NODE_ENV?: string;
}>;
export type IEnv = z.infer<typeof envSchema>;
export declare const TEST_ENV: IEnv;
export declare function setTestEnv(custom?: IEnv): void;
