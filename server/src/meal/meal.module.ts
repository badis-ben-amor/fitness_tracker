import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';

@Module({
  imports: [],
  controllers: [MealController],
  providers: [PrismaService, MealService],
})
export class MealModule {}
