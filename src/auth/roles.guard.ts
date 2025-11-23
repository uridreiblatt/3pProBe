import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { rolesEnum } from './entities/role.enum';
import { ROLES_KEY } from './entities/roles.decorator';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<rolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
   
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const ck = this.extractJWTFromCookie(request);
    const token = ck;
    if (!token) {
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });      
    
      console.log('cccccccccc')
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      return requiredRoles.some((role) => {
        console.log('requiredRoles',payload.role, role)
        if (payload.role === role ) return true;

    });
    } catch (error) {
      this.logger.error(error);
    }
    return false;
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
}

// canActivate(context: ExecutionContext): boolean {
//   const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//     context.getHandler(),
//     context.getClass(),
//   ]);

//   if (!requiredRoles) {
//     return true;
//   }

//   const { user } = context.switchToHttp().getRequest();
//   if (!user) return false
//   return requiredRoles.some((role) => user.roles?.includes(role));
// }
