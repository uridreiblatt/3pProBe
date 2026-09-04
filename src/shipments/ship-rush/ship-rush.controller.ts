import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { ShipRushService } from './ship-rush.service';
//import { CreateShipRushDto } from './dto/create-ship-rush.dto';
import { ApiTags } from '@nestjs/swagger';
import { XMLParser } from 'fast-xml-parser';
import { CreateShipRushDto } from './dto/create-ship-rush.dto';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
import { comapny } from 'src/auth/dto/create-auth.dto';
@ApiTags('shiprush')
@Controller('ship-rush')
export class ShipRushController {
  private readonly parser = new XMLParser();
  constructor(private readonly shipRushService: ShipRushService) {}
  @SkipCookieMatch()
  @Post()
  async handleXml(@Req() req: Request, comapnyId: string) {
    //console.log('handleXml', req);
    const xml = await this.getRawBody(req); // read stream

    const parsed = await this.parser.parse(xml);
    //console.log("handleXml-Shipment", parsed.Request.ShipTransaction.Shipment);
    //console.log("handleXml-Order", parsed.Request.ShipTransaction.Order);
    const createShipRushDto: CreateShipRushDto = {
      shipmentId: parsed.Request.ShipTransaction.Order.OrderId,
      trackingNumber: parsed.Request.ShipTransaction.Shipment.ShipmentNumber,
      status: '',
      carrier: '',
    };
    //console.log("createShipRushDto", createShipRushDto);
    await this.shipRushService.create(createShipRushDto, comapnyId);
    return;
  }

  private async getRawBody(req: Request): Promise<string> {
    const stream = req as unknown as IncomingMessage;

    return new Promise((resolve, reject) => {
      let data = '';
      stream.setEncoding('utf8');

      stream.on('data', (chunk) => (data += chunk));
      stream.on('end', () => resolve(data));
      stream.on('error', (err) => reject(err));
    });
  }
}
