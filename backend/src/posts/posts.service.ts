import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image ?? undefined,
      author: {
        id: post.author.id,
        name: post.author.name,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image ?? undefined,
      author: {
        id: post.author.id,
        name: post.author.name,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  }

  async create(data: {
    title: string;
    content: string;
    image?: string;
    authorId: number;
  }) {
    const post = await this.prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image ?? undefined,
      author: {
        id: post.author.id,
        name: post.author.name,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  }

  async update(
    id: number,
    data: { title?: string; content?: string; image?: string },
  ) {
    const post = await this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image ?? undefined,
      author: {
        id: post.author.id,
        name: post.author.name,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    };
  }

  async remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
