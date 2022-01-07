import {
  Controller,
  Get,
  Post,
  Redirect,
  Param,
  Body,
  Res,
  HttpStatus,
  HttpException,
  UseFilters,
  ForbiddenException,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cats.service';
import { HttpExceptionFilter } from '../common/exception-filter/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validate.pipe';
import { RolesGuard } from '../common/guard/role.guard';
import { LoggingInterceptor } from '../common/interceptor/logging.interceptor';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) // 异常过滤器, 作用域: 控制器
@UseGuards(RolesGuard) // 守卫, 作用域: 控制器
@UseInterceptors(LoggingInterceptor) // 拦截器 作用域: 控制器
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  //   @Redirect('https://nestjs.com', 301)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('error')
  getError() {
    // throw new HttpException('错误', HttpStatus.FORBIDDEN);
    throw new HttpException(
      { code: 404, message: '哈哈哈' },
      HttpStatus.FORBIDDEN,
    );
  }

  // 异常过滤器, 作用域: 方法
  @Post('exceptionFilter')
  @UseFilters(HttpExceptionFilter)
  exceptionFilter() {
    throw new ForbiddenException();
  }

  @Get('find/:id')
  findOne(@Param('id') id): string {
    return `这是第${id}个`;
  }

  @Post()
  create(): string {
    return '呵呵呵呵-POST';
  }

  @Post('create')
  // @UsePipes(ValidationPipe) // 管道 作用域: 方法
  async creatNew(@Body(ValidationPipe) cat: Cat) {
    this.catsService.create(cat);
  }

  @Get('res')
  res(@Res() res: Response) {
    res.status(HttpStatus.OK).send('kkkkkkk');
  }
}
