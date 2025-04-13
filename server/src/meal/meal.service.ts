import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDTo } from './dto/update-meal.dto';

@Injectable()
export class MealService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.meal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: number, mealId: number) {
    return this.prisma.meal.findUnique({ where: { userId, id: mealId } });
  }

  async create(createMealData: CreateMealDto, id: number) {
    return this.prisma.meal.create({
      data: {
        userId: id,
        meal_name: createMealData.meal_name,
        calories: createMealData.calories,
        carbs: createMealData.carbs,
        fats: createMealData.fats,
        protein: createMealData.protein,
      },
    });
  }

  async update(userId: number, mealId: number, updateMealDto: UpdateMealDTo) {
    return this.prisma.meal.update({
      where: { userId, id: mealId },
      data: updateMealDto,
    });
  }

  async delete(userId: number, mealId: number) {
    return this.prisma.meal.delete({ where: { userId, id: mealId } });
  }
}
