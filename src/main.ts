import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';
import { ValidationPipe } from './common/pipes/validate.pipe';
import { RolesGuard } from './common/guard/role.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 异常过滤器, 作用域: 全局
  app.useGlobalFilters(new HttpExceptionFilter());
  // 管道 作用域: 全局
  // app.useGlobalPipes(new ValidationPipe());
  // 守卫 作用域: 控制器
  // app.useGlobalGuards(new RolesGuard());
  // 拦截器 作用域: 控制器
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
