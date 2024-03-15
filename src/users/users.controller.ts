import { Body, Controller, Param, Post, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDto } from './dtos/user.signup.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  create(@Body() createUserDto: UserSignUpDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    try {
      return this.userService.findOne(username);
    }catch(error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error
      },
      HttpStatus.FORBIDDEN,
      {
        cause: error
      }
      )
    }
  }
}
