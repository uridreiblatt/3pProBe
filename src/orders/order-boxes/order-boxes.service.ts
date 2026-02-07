import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderBoxDto } from "./dto/create-order-box.dto";
//import { UpdateOrderBoxDto } from './dto/update-order-box.dto';
import { OrderBoxes } from "./entities/order-box.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//import { Boxsize } from 'src/boxes/entities/box.entity';
//import { Order } from 'src/order/entities/order.entity';
import { UpdateOrderBoxDto } from "./dto/update-order-box.dto";
import { Order } from "../order/entities/order.entity";
import { Boxsize } from "src/maintenence/boxes/entities/box.entity";
import { OrderBoxesItems } from "../order-box-items/entities/order-box-item.entity";

@Injectable()
export class OrderBoxesService {
  constructor(
    @InjectRepository(OrderBoxes)
    private OrderBoxesRepository: Repository<OrderBoxes>,
    @InjectRepository(OrderBoxesItems)
    private OrderBoxesItemsRepository: Repository<OrderBoxesItems>
  ) {}
  async create(createOrderBoxDto: CreateOrderBoxDto) {
    //    delete createOrderBoxDto['id'];
    const ordB = new OrderBoxes();
    //ordB.boxNo = createOrderBoxDto.boxNo;
    ordB.boxweight = createOrderBoxDto.boxweight;
    ordB.boxSize = new Boxsize();
    ordB.boxSize.id = createOrderBoxDto.boxId;
    ordB.order = new Order();
    ordB.order.id = createOrderBoxDto.orderId;
    ordB.lineRemarks = createOrderBoxDto.lineRemarks;
    const res = await this.OrderBoxesRepository.save(ordB);

    await Promise.all(
      (createOrderBoxDto.orderBoxLines ?? []).map((obl) => {
        const { orderBoxesId, orderId, companyId, id, ...rest } = obl;
        const insLine = {
          ...rest,
          orderId: createOrderBoxDto.orderId,
          //orderBoxesId: res.id,
          orderBox: { id: res.id },
        };

        const ins = new OrderBoxesItems();
        ins.orderBoxes = new OrderBoxes();
        ins.orderBoxes.id = res.id;
        ins.partNumber = obl.partNumber;
        ins.productName = obl.productName;
        ins.productDescription = obl.productDescription;
        ins.itemsCount = obl.itemsCount;
        ins.orderLineItemsCount = obl.orderLineItemsCount;
        ins.orderId = createOrderBoxDto.orderId;
        //console.log(insLine);
        return this.OrderBoxesItemsRepository.save(ins);
      })
    );

    //throw BadRequestException
    return res;
  }

  async findAll(id: string) {
    return await this.OrderBoxesRepository.find({
      where: { order: { id: id } },
      relations: {
        boxSize: true,
      },
    });
  }

  async findOne(id: string) {
    const res =  await this.OrderBoxesRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        boxSize: true,
        order: true,
      },
    });
    const {  order, ...rest } = res;
    return {...rest , orderId: order.id}
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
    const resAll = res.map((ordBox) => {
      return {
        id: ordBox.id,
        boxweight: ordBox.boxweight,
        boxNo: ordBox.boxNo,
        itemsCount: ordBox.itemsCount,
        lineRemarks: ordBox.lineRemarks,
        createdAt: ordBox.createdAt,
        box: {
          id: ordBox.boxSize.id,
          sizeDesc: ordBox.boxSize.sizeDesc,
        },
      };
    });
    return resAll;
  }

  async update(id: string, updateOrderBoxDto: UpdateOrderBoxDto) {
    const { boxId, companyId, orderBoxLines, ...rest } = updateOrderBoxDto;
    //console.log("updateOrderBoxDto", updateOrderBoxDto);
    const data = {
      ...rest,
      ...(boxId && { boxSize: { id: boxId } }),
    };
    const res = await this.OrderBoxesRepository.update(id, data);
  
    await Promise.all(
      (updateOrderBoxDto.orderBoxLines ?? []).map((obl) =>
      {
        const { orderBoxesId, companyId, ...rest } = obl;
        const upt = {
          
          ...rest,       
          orderBoxes: {id: id},    
        }
        console.log("upt", upt);
          return this.OrderBoxesItemsRepository.update(upt.id, upt)

      }
        
      )
    );
      return res;
    //throw BadRequestException
  }

  async remove(id: string) {
    const olbx = await this.OrderBoxesItemsRepository.find({
      where: {
        orderBoxes: { id: id },
      },
    });
    await Promise.all(
    olbx.map(async (ol) => {
      return this.OrderBoxesItemsRepository.delete(ol.id);
    }));
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
