import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        try {
            await this.postsService.create(createPostDto);

            return { message: 'Post created successfully', statusCode: 201 };
        }

        catch (error) {
            return { message: 'Post not created', statusCode: 400 };
        }
    }

    @Get()
    async findAll() {
        try {
            const posts = await this.postsService.findAll();

            return { message: 'Posts retrieved successfully', statusCode: 200, posts };
        }

        catch (error) {
            return { message: 'Posts not retrieved', statusCode: 400 };
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const post = await this.postsService.findOne(+id);

            return { message: 'Post retrieved successfully', statusCode: 200, post };
        }

        catch (error) {
            return { message: 'Post not retrieved', statusCode: 400 };
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
        try {
            await this.postsService.update(+id, updatePostDto);

            return { message: 'Post updated successfully', statusCode: 200 };
        }

        catch (error) {
            return { message: 'Post not updated', statusCode: 400 };
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.postsService.remove(+id);

            return { message: 'Post deleted successfully', statusCode: 200 };
        }

        catch (error) {
            return { message: 'Post not deleted', statusCode: 400 };
        }
    }
}