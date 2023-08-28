import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto, SignUpDto } from './auth.dto';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.authRepository.findByUsername(loginDto.username);

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching || !user) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { username: user.username, avatar: user.avatar };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto, id: string) {
    const userExists = await this.authRepository.findByUsername(signUpDto.username);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);

    await this.authRepository.create(signUpDto.username, signUpDto.password, signUpDto.avatar, id);
  }

  async findAll(): Promise<Auth[]> {
    return this.authRepository.findAll();
  }
}