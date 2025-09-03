import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @HttpPost()
  async create(
    @Body()
    data: {
      title: string;
      content: string;
      image?: string;
      authorId: number;
    },
  ) {
    return this.postsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { title?: string; content?: string; image?: string },
  ) {
    return this.postsService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
