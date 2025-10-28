import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sms.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly username: string;
  private readonly pwd: string;
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.username = this.configService.get<string>('SMS_USERNAME');
    this.pwd = this.configService.get<string>('SMS_PWD');
  }

  async create(createSmDto: CreateSmDto) {
    //const url = `${baseUrl}/oauth/access_token`
    const url = `https://restapi.soprano.co.il/api/dynamicsms`;

    const requestsms = {
      UserName: this.username,
      Password: this.pwd,
      SenderName: 'SabarHealth',
      DeliveryName: 'צבר רפואה',
      Relative: 0,
      RootReference: 0,
      Ist2s: false,
      Recipients: [
        {
          Cellphone: createSmDto.userMobile,
          Reference: '',
          TemplateID: '',
          URID: '',
          BodyMessage: createSmDto.userMessage,
        },
      ],
    };
    const data = await lastValueFrom(
      this.httpService
        .post(url, requestsms, {
          headers: { 'Content-Type': 'application/json' },
        })
        .pipe(map((resp) => resp.data))
        .pipe(
          catchError((error) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
    );
    if (data.StatusCode === 0) return data;
    else {
      this.logger.error(data);
      throw new BadRequestException('Sms', {
        cause: new Error(),
        description: data,
      });
    }
  }
}
