import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisam: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    res: Response,
  ): Promise<Response> {
    try {
      const user = await this.prisam.user.findUnique({ where: { email } });
      if (user) throw new BadRequestException('User already exist');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisam.user.create({
        data: { name, email, password: hashedPassword },
      });

      const accessToken = this.jwtService.sign(
        { id: newUser.id, isAdmin: newUser.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: newUser.id, isAdmin: newUser.isAdmin },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV'),
        sameSite: 'strict',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          60 *
          60 *
          1000,
      });

      return res.status(HttpStatus.CREATED).json({ accessToken });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException('Register failed');
    }
  }

  async login(
    email: string,
    password: string,
    res: Response,
  ): Promise<Response> {
    try {
      const user = await this.prisam.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('User not found');

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword)
        throw new UnauthorizedException('Unauthorized credentials');

      const accessToken = this.jwtService.sign(
        { id: user.id, isAdmin: user.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );
      const refreshToken = this.jwtService.sign(
        { id: user.id, isAdmin: user.isAdmin },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          60 *
          60 *
          1000,
      });

      return res.status(HttpStatus.OK).json({ accessToken });
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      )
        throw error;
      throw new InternalServerErrorException('Login failed');
    }
  }

  async refresh(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.cookies;
    if (!refreshToken) throw new BadRequestException('Not token provided');

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET_KEY'),
      });

      const newAccessToken = this.jwtService.sign(
        { id: payload.id, isAdmin: payload.isAdmin },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET_KEY'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      );

      return res.status(HttpStatus.OK).json({ newAccessToken });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Invalid refresh token');
    }
  }

  async logout(res: Response): Promise<Response> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        maxAge:
          this.configService.get('REFRESH_TOKEN_MAX_AGE_DAYS') *
          24 *
          60 *
          60 *
          1000,
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Logged out successfully&' });
    } catch (error) {
      throw new InternalServerErrorException('Logged out failed');
    }
  }
}
