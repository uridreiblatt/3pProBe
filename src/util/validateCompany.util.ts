import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserCompany } from 'src/usersCompanies/user-company/entities/user-company.entity';

export function validateCompany(cookieCompany: string, selectCompany: string): void {
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

export function validateCompanies(cookieCompany: number, userCompanies: UserCompany[]): void {
  const companyFound =userCompanies.find((comp)=>{
    comp.id === cookieCompany
  })


  if (companyFound === undefined) {      
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "FORBIDDEN",
        },
        HttpStatus.FORBIDDEN,
        {
          cause: "invalid cookieCompany: " + cookieCompany + " for destination " + userCompanies.concat().toString(),
        }
      );
    }
}