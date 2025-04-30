import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'guards/auth.guard';
// import { AuthGuard } from 'src/guards/auth.guard';

// @UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUser(@Req() req: { user: { id: number } }) {
    return this.userService.getUser(req.user.id);
  }

  @Post()
  createUser(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.createUser(body.name, body.email, body.password);
  }

  @Get('test')
  test() {
    return this.userService.test();
  }
}
