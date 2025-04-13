import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, isAdmin: true },
    });
  }

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({ data: { name, email, password } });
  }
}
