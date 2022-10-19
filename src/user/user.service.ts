import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { forwardRef } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(AuthHelper)
    private readonly helper: AuthHelper,

    @Inject(forwardRef(() => CartService))
    private cartService: CartService,

    @Inject(InvoiceService)
    private readonly invoiceService: InvoiceService,
  ) {}

  private logger = new Logger('UserService');

  async create(createUserDto: CreateUserDto) {
    const user: User = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException(
        'This user already exists in the system',
        HttpStatus.CONFLICT,
      );
    }
    this.logger.verbose(
      `New user in system with email is: ${createUserDto.email.toLowerCase()}`,
    );
    createUserDto.password = this.helper.encodePassword(createUserDto.password);

    createUserDto.cart = await this.cartService.create();
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneListedBySeller(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update({ id }, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return `delete successfully`;
  }
}
