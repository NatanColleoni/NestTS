import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserSignUpDto } from './dtos/user.signup.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: UserSignUpDto) {
    createUserDto.password = await this.userHash(createUserDto.password);

    this.userModel.create(createUserDto);
  }

  findOne(username: string) {
    const findUser = this.userModel.findOne({username: username});
    return findUser;
  }

  findAll() {
    const users = this.userModel.find().select('-password');
    return users;
  }

  private async userHash(userPassword) {
    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(userPassword, saltOrRounds);
    return passwordHash;
  }
}