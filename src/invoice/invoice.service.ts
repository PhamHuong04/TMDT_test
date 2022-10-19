import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Between, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User as UserEntity } from '../user/entities/user.entity';
import { ProductService } from '../product/product.service';
import { User } from '../common/decorator/user.decorator';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async create(user: UserEntity) {
    const invoice = new Invoice();
    invoice.user = await this.userService.findOne(user.id);
    invoice.products = user.cart.products;
    invoice.created_at = new Date();
    return this.invoiceRepository.save(invoice);
  }

  async salesStatisticsByDay(
    creatorId: number,
    created_at: string,
  ): Promise<Invoice[]> {
    const _date = created_at ? new Date(created_at) : new Date();
    const invoices: Invoice[] = await this.invoiceRepository.find({
      where: {
        created_at: Between(startOfDay(_date), endOfDay(_date)),
        products: {
          creatorId,
        },
      },
      relations: {
        products: true,
        user: true,
      },
    });
    return invoices;
  }

  async getBestSellingProductByDay(
    creatorId: number,
    created_at: string,
  ): Promise<Invoice[]> {
    const _date = created_at ? new Date(created_at) : new Date();
    const invoices: Invoice[] = await this.invoiceRepository.find({
      where: {
        created_at: Between(startOfDay(_date), endOfDay(_date)),
        products: {
          creatorId,
        },
      },
      relations: {
        products: true,
        user: true,
      },
    });
    const listProducts = [];
    for (let i = 0; i < invoices.length; i++) {
      listProducts.push(...invoices[i].products);
    }
    const listProductIds = [];
    for (let i = 0; i < listProducts.length; i++) {
      listProductIds.push(listProducts[i].id);
    }

    listProductIds.sort();
    const counts = {};
    const uniqueEles = [...new Set(listProductIds)];
    const listOccur = [];

    for (const num of listProductIds) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    for (let i = 0; i < uniqueEles.length; i++) {
      listOccur.push(counts[uniqueEles[i]]);
    }
    const listBestSellingProducts = [];
    for (let i = 0; i < uniqueEles.length; i++) {
      if (counts[uniqueEles[i]] == Math.max(...listOccur))
        listBestSellingProducts.push(
          await this.productService.findOne(uniqueEles[i]),
        );
    }
    return listBestSellingProducts;
  }

  async getBestBuyer(
    creatorId: number,
    created_at: string,
  ): Promise<typeof User[]> {
    const _date = created_at ? new Date(created_at) : new Date();
    const invoices: Invoice[] = await this.invoiceRepository.find({
      where: {
        created_at: Between(startOfDay(_date), endOfDay(_date)),
        products: {
          creatorId,
        },
      },
      relations: {
        products: true,
        user: true,
      },
    });
    const listProducts = [];
    for (let i = 0; i < invoices.length; i++) {
      listProducts.push(...invoices[i].products);
    }
    const listProductIds = [];
    for (let i = 0; i < listProducts.length; i++) {
      listProductIds.push(listProducts[i].id);
    }

    listProductIds.sort();
    const counts = {};
    const uniqueEles = [...new Set(listProductIds)];
    const listOccur = [];

    for (const num of listProductIds) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    for (let i = 0; i < uniqueEles.length; i++) {
      listOccur.push(counts[uniqueEles[i]]);
    }
    // find invoice have product id
    let listBestBuyerIds = [];
    for (let i = 0; i < uniqueEles.length; i++) {
      if (counts[uniqueEles[i]] == Math.max(...listOccur)) {
        const listPre = invoices.filter((invoice) =>
          invoice.products.some((product) => product.id == uniqueEles[i]),
        );
        for (let j = 0; j < listPre.length; j++) {
          listBestBuyerIds.push(listPre[j].user.id);
        }
      }
    }
    listBestBuyerIds = [...new Set(listBestBuyerIds)];
    const listBestBuyer = [];
    for (let i = 0; i < listBestBuyerIds.length; i++) {
      listBestBuyer.push(
        await this.userService.findOneListedBySeller(listBestBuyerIds[i]),
      );
    }
    return listBestBuyer;
  }

  async salesStatisticsByWeek(creatorId: number): Promise<Invoice[]> {
    const today = new Date();
    const invoice: Invoice[] = await this.invoiceRepository.find({
      where: {
        created_at: Between(
          startOfWeek(today, { weekStartsOn: 1 }),
          endOfWeek(today, { weekStartsOn: 1 }),
        ),
        products: {
          creatorId,
        },
      },
      relations: {
        products: true,
        user: true,
      },
    });
    return invoice;
  }

  async salesStatisticsByMonth(creatorId: number): Promise<Invoice[]> {
    const today = new Date();
    const invoice: Invoice[] = await this.invoiceRepository.find({
      where: {
        created_at: Between(startOfMonth(today), endOfMonth(today)),
        products: {
          creatorId,
        },
      },
      relations: {
        products: true,
        user: true,
      },
    });
    return invoice;
  }
}
