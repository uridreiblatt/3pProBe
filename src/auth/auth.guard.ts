import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ck = this.extractJWTFromCookie(request);
    let token = ck;
    //console.log('AuthGuard', 'token', token)
    if (!token) {
      const tokenHeader = this.extractTokenFromHeader(request);   
      token = tokenHeader;    //ck
      //console.log('AuthGuard', 'tokenHeader', tokenHeader)
    }        
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers           
      request['user'] = payload;
      //console.log('AuthGuard', 'payload',payload)
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }

  private extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
  private extractTokenFromHeader(req: Request): string | null {
     if (req.headers && req.headers.authorization) {
     

      const obj = JSON.parse(req.headers.authorization?.split(" ")[1] );
      const token = obj.access_token;
      return token;
      

    }
    return null;
  }
}
