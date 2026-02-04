import { Injectable } from '@nestjs/common';
import { CreateOrderBoxDto } from './dto/create-order-box.dto';
//import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
import { OrderBoxes } from './entities/order-box.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { Boxsize } from 'src/boxes/entities/box.entity';
//import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
import { Order } from '../order/entities/order.entity';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';

@Injectable()
export class OrderBoxesService {
  constructor(
    @InjectRepository(OrderBoxes)
    private OrderBoxesRepository: Repository<OrderBoxes>,
  ) {}
  async create(createOrderBoxDto: CreateOrderBoxDto) {
    
//    delete createOrderBoxDto['id'];
      const ordB =  new OrderBoxes();
      //ordB.boxNo = createOrderBoxDto.boxNo;      
      ordB.boxweight = createOrderBoxDto.boxweight;
      ordB.boxSize = new Boxsize();
      ordB.boxSize.id = createOrderBoxDto.boxId;
      ordB.order =  new  Order();
      ordB.order.id = createOrderBoxDto.orderId;    
      ordB.lineRemarks = createOrderBoxDto.lineRemarks;  

    return await this.OrderBoxesRepository.save(ordB);
  }

  async findAll(id: string) {
    return await this.OrderBoxesRepository.find({
      where : {order: {id: id}},
      relations: {
        boxSize: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.OrderBoxesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        boxSize: true,
      },
    });
  }

  async getOrderBoxes(id: string) {
    const res = await this.OrderBoxesRepository.find({
      where: {
        order: {
          id: id,
        },
      },
      relations: {
        boxSize: true,
      },
    });
    const resAll = res.map((ordBox)=>{
      return {
        id:ordBox.id,
        boxweight: ordBox.boxweight,
        boxNo: ordBox.boxNo,
        itemsCount: ordBox.itemsCount,
        lineRemarks: ordBox.lineRemarks,
        box: {
          id: ordBox.boxSize.id,
          sizeDesc: ordBox.boxSize.sizeDesc
        }


      }
    });
    return resAll;
  }

  async update(id: string, updateOrderBoxDto: UpdateOrderBoxDto) {
    //const orderBoxes = new OrderBoxes();
    //orderBoxes.boxweight = updateOrderBoxDto.boxweight;
    return await this.OrderBoxesRepository.update(id, updateOrderBoxDto);
  }

  async remove(id: string) {
    return await this.OrderBoxesRepository.delete(id);
  }
  async removeByOrderId(id: string) {
    // const olbx = await this.OrderBoxesRepository.find({
    //   where: {
    //     order: { id: id },
    //   },
    // });
    // olbx.forEach(async (ol) => {
    //   await this.OrderBoxesRepository.delete(ol.id);
    // });
    await this.OrderBoxesRepository.delete({ order: { id: id } });
  }
}
