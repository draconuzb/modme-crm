"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
    app.enableCors({
        origin: corsOrigin.split(',').map((s) => s.trim()),
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Modme CRM API')
        .setDescription('Educational Center CRM API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(3000);
    console.log('API running on http://localhost:3000');
    console.log('Swagger docs: http://localhost:3000/api/docs');
}
bootstrap();
//# sourceMappingURL=main.js.map