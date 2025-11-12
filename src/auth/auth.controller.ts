import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateAuthSwitchCompanyDto, JwtDetails, SwitchCompanyDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { SkipCookieMatch } from "src/auth/entities/skip-cookie-match.decorator";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipCookieMatch()
  @Post('login')
  async signIn(
    @Body() signInDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    
    const resUser = await this.authService.signIn(signInDto);
    console.log('resUser', resUser)
    if (resUser === undefined || resUser === null) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    resUser.userPasswordEnc = '';
    const jwtDetails = new JwtDetails();
    jwtDetails.userName = resUser.userName;
    const maxValueOfY = Math.max(
      ...resUser.usersRoles.map((o) => o.role['id']),
      0,
    );
    jwtDetails.userRole = maxValueOfY.toString();
    jwtDetails.uuid = resUser.userUuid;
    
    jwtDetails.userComapny = resUser.userCompany[0].company.id ;
    const jwtToken = await this.authService.signAsyncCookie(jwtDetails);
    response.cookie('access_token', jwtToken.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    });
    const resLogin = {
      id: resUser.id,
      isSignedIn: true,
      userName: resUser.userName,
      userLastName: resUser.userSurname,
      usermail: resUser.usermail,
      userRoles: resUser.usersRoles.map((o) => {
        return { id: o.role.id, role: o.role.role };
      }),
      userSelectedCompany: resUser.userCompany[0]?.company.id || 0,
      userRoleName: resUser.usersRoles.find((ur) => {
        if (ur.role.id === maxValueOfY) return true;
      }).role.role,
      userCompanies: resUser.userCompany.map((o) => {
        return { id: o.company.id, companyName: o.company.name };
      }),
      color: resUser.color,
      userRoleId: maxValueOfY,
    };
    return resLogin;
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
@UseGuards(AuthGuard)
  @Post('SwitchCompany')
  async SwitchCompany(@Request() req, 
                      @Body() switchCompanyDto: SwitchCompanyDto,
                      @Res({ passthrough: true }) response: Response,) {
    const createAuthSwitchCompanyDto: CreateAuthSwitchCompanyDto = {
      companyId: switchCompanyDto.companyId,
      UserUuid: req.user.userUuid, 
    }
    const resUser = await this.authService.SwitchCompany(createAuthSwitchCompanyDto)
    if (resUser === undefined || resUser === null) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    const companyExists = resUser.userCompany.find((cpm)=>{
      if (cpm.id.toString()===switchCompanyDto.companyId ) return true;
    })
    if(companyExists=== undefined)
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);

    resUser.userPasswordEnc = '';
    const jwtDetails = new JwtDetails();
    jwtDetails.userName = resUser.userName;
    const maxValueOfY = Math.max(
      ...resUser.usersRoles.map((o) => o.role['id']),
      0,
    );
    jwtDetails.userRole = maxValueOfY.toString();
    jwtDetails.uuid = resUser.userUuid;
    
    jwtDetails.userComapny = switchCompanyDto.companyId ;
    const jwtToken = await this.authService.signAsyncCookie(jwtDetails);
    response.cookie('access_token', jwtToken.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 3600000,
    });
    const resLogin = {
      id: resUser.id,
      isSignedIn: true,
      userName: resUser.userName,
      userLastName: resUser.userSurname,
      usermail: resUser.usermail,
      userRoles: resUser.usersRoles.map((o) => {
        return { id: o.role.id, role: o.role.role };
      }),
      userSelectedCompany: switchCompanyDto.companyId,
      userRoleName: resUser.usersRoles.find((ur) => {
        if (ur.role.id === maxValueOfY) return true;
      }).role.role,
      userCompanies: resUser.userCompany.map((o) => {
        return { id: o.company.id, companyName: o.company.name };
      }),
      color: resUser.color,
      userRoleId: maxValueOfY,
    };
    return resLogin;

  }
  
  
}
