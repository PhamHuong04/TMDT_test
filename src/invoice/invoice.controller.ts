import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { User } from 'src/common/decorator/user.decorator';
import { User as UserEntity } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('invoice')
@UseGuards(AuthGuard('jwt'))
// AbilitiesGuard
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('create-new-invoice')
  create(@User() user: UserEntity) {
    return this.invoiceService.create(user);
  }

  @Get('sales-statistics-by-day/:day')
  salesStatisticsByDay(
    @User() user: UserEntity,
    @Param() created_at: { day: string },
  ) {
    return this.invoiceService.salesStatisticsByDay(user.id, created_at.day);
  }

  @Get('best-selling-product-by-day/:day')
  getBestSellingProductByDay(
    @User() user: UserEntity,
    @Param() created_at: { day: string },
  ) {
    return this.invoiceService.getBestSellingProductByDay(
      user.id,
      created_at.day,
    );
  }

  @Get('best-buyer-by-day/:day')
  getBestBuyerByDay(
    @User() user: UserEntity,
    @Param() created_at: { day: string },
  ) {
    return this.invoiceService.getBestBuyer(user.id, created_at.day);
  }

  @Get('sales-statistics-by-week')
  salesStatisticsByWeek(@User() user: UserEntity) {
    return this.invoiceService.salesStatisticsByWeek(user.id);
  }
  @Get('sales-statistics-by-month')
  salesStatisticsByMonth(@User() user: UserEntity) {
    return this.invoiceService.salesStatisticsByMonth(user.id);
  }
}
