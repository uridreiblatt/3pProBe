import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderBasketDto } from './dto/create-order-basket.dto';
import { UpdateOrderBasketDto } from './dto/update-order-basket.dto';
import { OrderBasket } from './entities/order-basket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderBasketService {
  constructor(
    @InjectRepository(OrderBasket)
    private OrderBasketsRepository: Repository<OrderBasket>,
  ) {}

  async create(createOrderBasketDto: CreateOrderBasketDto) {
    const existingBox = await this.OrderBasketsRepository.findOne({
      where: {
        //order: { id: createOrderBasketDto.order.id },
        basketId: createOrderBasketDto.basketId,
      },
      relations: {
        order: true,
      },
    });
    if (existingBox !== null) {
      throw new BadRequestException(
        'Basket in Use on order ' + existingBox.order.ORDNAME,
        {
          cause: new Error(),
          description: 'Basket in Use',
      });
    }
    return await this.OrderBasketsRepository.save(createOrderBasketDto);
  }

  async findAll(companyId:  number) {
    return await this.OrderBasketsRepository.find({
    });
  }

  async findOne(id: string) {
    return await this.OrderBasketsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByOrder(orderId: string) {
    return await this.OrderBasketsRepository.find({
      where: {
        order: { id: orderId },
      },
    });
  }

  async update(id: string, updateOrderBasketDto: UpdateOrderBasketDto) {
    return await this.OrderBasketsRepository.update(id, updateOrderBasketDto);
  }

  async remove(id: string) {
    return await this.OrderBasketsRepository.delete(id);
  }
  async removeByOrderId(id: string) {
    // const olbx = await this.OrderBasketsRepository.find({
    //   where: {
    //     order: { id: id },
    //   },
    // });
    // olbx.forEach(async (ol) => {
    //   await this.OrderBasketsRepository.delete(ol.id);
    // });
    await this.OrderBasketsRepository.delete({ order: { id: id } });
  }
}
