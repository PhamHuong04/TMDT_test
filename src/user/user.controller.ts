import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbilitiesGuard } from 'src/ability/abilities.guard';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { Action } from 'src/ability/ability.factory';
import { User as UserEntity } from './entities/user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'), AbilitiesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-new-user')
  @CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get('get-all-users')
  @CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckAbilities({ action: Action.READ, subject: UserEntity })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.MANAGE_USER, subject: UserEntity })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
