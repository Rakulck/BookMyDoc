import { ServeStaticModuleOptions, ServeStaticModuleOptionsFactory } from '@nestjs/serve-static';
export declare class UiService implements ServeStaticModuleOptionsFactory {
    createLoggerOptions(): ServeStaticModuleOptions[];
}
