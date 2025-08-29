import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../../generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(
    authorId: number,
    title: string,
    content: string,
    image?: string,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: { authorId, title, content, image },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(
    id: number,
    title: string,
    content: string,
    image?: string,
  ): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data: { title, content, image },
    });
  }

  async remove(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
