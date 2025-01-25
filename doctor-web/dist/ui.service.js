"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiService = void 0;
const common_1 = require("@nestjs/common");
const node_path_1 = require("node:path");
console.log((0, node_path_1.join)(__dirname, '..', 'ui', 'build'));
let UiService = class UiService {
    createLoggerOptions() {
        return [
            {
                rootPath: (0, node_path_1.join)(__dirname, '..', 'ui', 'build'),
                renderPath: /^((?!^\/(api|_health)).)*$/s,
                exclude: ['/api*', '/health*', '/api/docs*'],
                serveStaticOptions: {
                    cacheControl: true,
                    maxAge: '1year',
                },
            },
        ];
    }
};
exports.UiService = UiService;
exports.UiService = UiService = __decorate([
    (0, common_1.Injectable)()
], UiService);
//# sourceMappingURL=ui.service.js.map