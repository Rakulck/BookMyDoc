import { Injectable } from '@nestjs/common';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static';
import { join } from 'node:path';

@Injectable()
export class UiService implements ServeStaticModuleOptionsFactory {
  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [
      {
        rootPath: join(process.cwd(), 'ui/build'),
        renderPath: /^((?!^\/(api|_health)).)*$/s,
        exclude: ['/api*', '/health*', '/api/docs*'],
        serveStaticOptions: {
          cacheControl: true,
          maxAge: '1year',
        },
      },
    ];
  }
}
