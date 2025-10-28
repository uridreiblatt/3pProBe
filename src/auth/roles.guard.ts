import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { ROLES_KEY } from './entities/roles.decorator';
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!token) {
      return false;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      return requiredRoles.some((role) => payload.role.includes(role));
    } catch (error) {
      this.logger.error(error);
    }
    return false;
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
