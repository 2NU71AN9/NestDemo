import {
  Controller,
  Get,
  Post,
  Redirect,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  //   @Redirect('https://nestjs.com', 301)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
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
  async creatNew(@Body() cat: Cat) {
    this.catsService.create(cat);
  }

  @Get('res')
  res(@Res() res: Response) {
    res.status(HttpStatus.OK).send('kkkkkkk');
  }
}
