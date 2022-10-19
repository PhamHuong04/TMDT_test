import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto, creatorId: number) {
    return this.productRepository.save({
      ...createProductDto,
      creatorId,
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found product', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found product', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.update({ id }, updateProductDto);
    return {
      message: 'Update successfully',
    };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Not found product', HttpStatus.NOT_FOUND);
    }
    await this.productRepository.delete({ id });
    return {
      message: 'Delete successfully',
    };
  }
}
