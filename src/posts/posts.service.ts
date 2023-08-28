import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async create(data: CreatePostDto): Promise<Post> {
        if (!data.title || !data.text) {
            throw new HttpException('Missing title or text', HttpStatus.BAD_REQUEST);
        }

        const post = await this.postsRepository.create(data);

        return post;
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.postsRepository.findAll();

        if (!posts) {
            throw new HttpException('Posts not found', HttpStatus.NOT_FOUND);
        }

        return posts;
    }

    async findOne(id: number): Promise<Post | null> {
        const post = await this.postsRepository.findOne(id);

        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        return post;
    }

    async update(id: number, data: CreatePostDto): Promise<Post> {
        if (!id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }

        if (!data.title || !data.text) {
            throw new HttpException('Missing title or text', HttpStatus.BAD_REQUEST);
        }

        const post = await this.postsRepository.update(id, data);

        return post;
    }

    async remove(id: number): Promise<Post> {
        if (!id) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }

        const post = await this.postsRepository.remove(id);

        return post;
    }
}