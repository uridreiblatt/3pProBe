import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Inject,
  UnauthorizedException,
  BadGatewayException,
  BadRequestException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SKIP_COOKIE_MATCH_KEY } from "src/auth/entities/skip-cookie-match.decorator";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";

export const COOKIE_MATCH_OPTS = "COOKIE_MATCH_OPTS";
type Methods = Array<
  "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"
>;

export interface CookieMatchOptions {
  cookieName: string;
  bodyFieldPath?: string;
  bodyMethods?: Methods;
  paramName?: string;
  paramMethods?: Methods;
}

@Injectable()
export class CookieMatchGuard implements CanActivate {
  constructor(
    @Inject(COOKIE_MATCH_OPTS) private readonly opts: CookieMatchOptions,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // ✅ Honor @SkipCookieMatch() on controller OR route
   
    const skip = this.reflector.getAllAndOverride<boolean>(
      SKIP_COOKIE_MATCH_KEY,
      [ctx.getHandler(), ctx.getClass()]
    );
    if (skip) return true;
    
    const req = ctx
      .switchToHttp()
      .getRequest<Request & { cookies?: Record<string, any>; body?: any }>();
    const method = (req.method || "").toUpperCase();

    const ck = this.extractJWTFromCookie(req);

    //const token = this.extractTokenFromHeader(request);
    const token = ck;    
    if (!token) {
      throw new UnauthorizedException();
    }
   
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      req["user"] = payload;
      // Body match (typically POST)
      const bodyMethods = this.opts.bodyMethods ?? ["POST", "PUT", "PATCH"];
      if (this.opts.bodyFieldPath && bodyMethods.includes(method as any)) {
        const bodyVal = getByPath(req.body, this.opts.bodyFieldPath);      
        if (bodyVal == null)
          throw new ForbiddenException(
            `Missing body field "${this.opts.bodyFieldPath}".`
          );
        if (String(payload.selectCompany) !== String(bodyVal)) {
          throw new ForbiddenException(
            `Cookie "${this.opts.cookieName}" must match body "${this.opts.bodyFieldPath}". comapny: "${payload.selectCompany}" destination company: "${String(bodyVal)}"`
          );
        }
      }
    return true;
  }

  private extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
}

// tiny helper: dot-path read (no external deps)
function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}
