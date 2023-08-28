import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './auth.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const response = await this.authService.login(loginDto);

            return {
                message: "User has been logged in successfully",
                statusCode: HttpStatus.OK,
                data: response
            }
        }

        catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        if (!signUpDto.username || !signUpDto.avatar) {
            throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST);
        }
        try {
            const id = uuidv4();

            await this.authService.signUp(signUpDto, id);

            return {
                message: id + " has been registered successfully!",
                statusCode: HttpStatus.OK
            }
        }

        catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('users')
    async findAll() {
        return this.authService.findAll();
    }
}
