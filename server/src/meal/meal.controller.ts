import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReqDto } from 'src/common/dto/req.dto';
import { UpdateMealDTo } from './dto/update-meal.dto';

@UseGuards(AuthGuard)
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  findAll(@Req() req: ReqDto) {
    return this.mealService.findAll(req.user.id);
  }

  @Get(':mealId')
  findOne(@Req() req: ReqDto, @Param('mealId', ParseIntPipe) mealId: number) {
    return this.mealService.findOne(req.user.id, mealId);
  }

  @Post()
  create(@Body() createMealDto: CreateMealDto, @Req() req: ReqDto) {
    return this.mealService.create(createMealDto, req.user.id);
  }

  @Patch(':mealId')
  update(
    @Body() updateMealDto: UpdateMealDTo,
    @Req() req: ReqDto,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.mealService.update(req.user.id, mealId, updateMealDto);
  }

  @Delete(':mealId')
  delete(@Req() req: ReqDto, @Param('mealId', ParseIntPipe) mealId: number) {
    return this.mealService.delete(req.user.id, mealId);
  }
}
