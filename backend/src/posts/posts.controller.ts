import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @HttpPost()
  create(
    @Body()
    dto: {
      authorId: number;
      title: string;
      content: string;
      image?: string;
    },
  ) {
    return this.postsService.create(
      dto.authorId,
      dto.title,
      dto.content,
      dto.image,
    );
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: { title: string; content: string; image?: string },
  ) {
    return this.postsService.update(id, dto.title, dto.content, dto.image);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
