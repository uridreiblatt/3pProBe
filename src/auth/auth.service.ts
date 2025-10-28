import { Injectable } from '@nestjs/common';
import { CreateAuthDto, JwtDetails } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    //private workerService: WorkerService,
  ) {}

  async signIn(signInDto: CreateAuthDto): Promise<User> {
    return await this.usersService.findOne(signInDto);
  }

  async signAsyncCookie(data: JwtDetails): Promise<{ access_token: string }> {
    const payload = {
      userName: data.userName,
      userUuid: data.uuid,
      role: data.userRole,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
