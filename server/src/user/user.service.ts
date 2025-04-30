import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, isAdmin: true },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return { user };
  }

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({ data: { name, email, password } });
  }

  async test() {
    return 'hi user';
  }
}
