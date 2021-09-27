import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ExamModule } from 'src/modules/exam/exam.module';
import { LaboratoryModule } from 'src/modules/laboratory/laboratory.module';

export const openApi = new DocumentBuilder()
  .setTitle('Wa - BackEnd')
  .setVersion('1.0')
  .addTag('Exam')
  .addTag('Laboratory')
  .build();

export function openApiDocument(app: NestExpressApplication): OpenAPIObject {
  return SwaggerModule.createDocument(app, openApi, {
    include: [LaboratoryModule, ExamModule],
  });
}
