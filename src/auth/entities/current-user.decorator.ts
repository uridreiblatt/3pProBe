import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

type JwtUser = Record<string, unknown> & {
  selectCompany?: string;
  roleId?: number;
};

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    return data ? request.user?.[data] : request.user;
  },
);

export const CurrentCompanyId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    const companyId = request.user?.selectCompany;

    if (!companyId) {
      throw new UnauthorizedException('Company is missing from the JWT');
    }

    return companyId;
  },
);
export const CurrentRoleId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUser }>();
    const roleId = Number(request.user?.role);

    if (!Number.isInteger(roleId) || roleId <= 0) {
      throw new UnauthorizedException('Role is missing or invalid in the JWT');
    }

    return roleId;
  },
);
