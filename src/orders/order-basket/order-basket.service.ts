import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderBasketDto } from './dto/create-order-basket.dto';
import { UpdateOrderBasketDto } from './dto/update-order-basket.dto';
import { OrderBasket } from './entities/order-basket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderBasketService {
  constructor(
    @InjectRepository(OrderBasket)
    private OrderBasketsRepository: Repository<OrderBasket>,
  ) {}

  async create(createOrderBasketDto: CreateOrderBasketDto, companyId: string) {
    const existingBox = await this.OrderBasketsRepository.findOne({
      where: {
        //order: { id: createOrderBasketDto.order.id },
        basketId: createOrderBasketDto.basketId,
        order: { comapny: { id: companyId } },
      },
      relations: {
        order: true,
      },
    });
    if (existingBox !== null) {
      throw new BadRequestException(
        'Basket in Use on order ' + existingBox.order?.ORDNAME,
        {
          cause: new Error(),
          description: 'Basket in Use',
        },
      );
    }

    const ins = new OrderBasket();
    ins.basketId = createOrderBasketDto.basketId;
    ins.basketRemarks = createOrderBasketDto.basketRemarks;
    ins.order = new Order();
    ins.order.id = createOrderBasketDto.orderId;
    return await this.OrderBasketsRepository.save(ins);
  }

  async findAll(companyId: string) {
    return await this.OrderBasketsRepository.find({});
  }

  async getOrderBasket(orderId: string, companyId: string) {
    return await this.OrderBasketsRepository.find({
      where: {
        order: { id: orderId, comapny: { id: companyId } },
      },
    });
  }

  async findOne(id: string, companyId: string) {
    return await this.OrderBasketsRepository.findOne({
      where: {
        id: id,
        order: { comapny: { id: companyId } },
      },
    });
  }

  async findByOrder(orderId: string, companyId: string) {
    return await this.OrderBasketsRepository.find({
      where: {
        order: { id: orderId, comapny: { id: companyId } },
      },
    });
  }

  async update(
    id: string,
    updateOrderBasketDto: UpdateOrderBasketDto,
    companyId: string,
  ) {
    return await this.OrderBasketsRepository.update(
      { id, order: { comapny: { id: companyId } } },
      updateOrderBasketDto,
    );
  }

  async remove(id: string, companyId: string) {
    return await this.OrderBasketsRepository.delete({
      id,
      order: { comapny: { id: companyId } },
    });
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
