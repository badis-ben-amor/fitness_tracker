import { PartialType } from '@nestjs/mapped-types';
import { CreateMealDto } from './create-meal.dto';

export class UpdateMealDTo extends PartialType(CreateMealDto) {}
