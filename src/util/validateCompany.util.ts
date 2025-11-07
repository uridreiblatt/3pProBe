import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export function validateCompany(cookieCompany: number, selectCompany: number): void {
  if (cookieCompany !== selectCompany) {      
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "FORBIDDEN",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: "invalid cookieCompany: " + cookieCompany + " for destination " + selectCompany,
        }
      );
    }
}