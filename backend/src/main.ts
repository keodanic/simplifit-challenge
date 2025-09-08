import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('API Simplifit Challenge') 
  .setDescription(
    'API para o desafio Simplifit, focada no gerenciamento de usuários e tipos de usuário para uma academia.\n\n' +
    'Funcionalidades incluem CRUD completo para usuários (operadores e membros) e tipos de usuário, ' +
    'com um sistema de autenticação baseado em JWT e autorização por papéis (Roles) com CASL.\n\n' +
    '`Desenvolvedor`\n' +
    '- [Victor Daniel](https://www.linkedin.com/in/victor-daniel-santos-cardoso-ab0787344/)\n\n',
  )
  .setVersion('1.0')
  .addTag('Usuários', 'Operações relacionadas aos usuários do sistema (operadores e membros)')
  .addTag('Tipos de Usuário', 'Operações relacionadas aos tipos/categorias de usuários (ex: Professor, Aluno)')
  .addTag('Autenticação', 'Operações de login para obter o token de acesso')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
