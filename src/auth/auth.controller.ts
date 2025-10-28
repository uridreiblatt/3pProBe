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
import { CreateAuthDto, JwtDetails } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: CreateAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const resUser = await this.authService.signIn(signInDto);
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
      usermail: '',
      userRoles: resUser.usersRoles.map((o) => {
        return { id: o.role.id, role: o.role.role };
      }),
      userRoleName: resUser.usersRoles.find((ur) => {
        if (ur.role.id === maxValueOfY) return true;
      }).role.role,
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
}
