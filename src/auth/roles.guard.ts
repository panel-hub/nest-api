import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DRoles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(DRoles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user)
        return this.matchRoles(roles ?? [], user?.roles ?? []);
    }

    matchRoles(roles: string[], uRoles: string[]): boolean {
        if (roles.includes('*')) {
            for (const role of roles) {
                if (!['*', ''].includes(role)) {
                    const status = uRoles.includes(role)
                    if (status) { return true };
                }
            }
            return false;
        } else {
            for (const role of roles) {
                if (!['*', ''].includes(role)) {
                    const tStatus = uRoles.includes(role)
                    if (!tStatus) { return false }
                }
            }
            return true
        }
    }
}
