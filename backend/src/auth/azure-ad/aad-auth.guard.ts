import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AzureADAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization === undefined) {
      return false;
    }

    try {
      const token = request.headers.authorization.split(' ')[1];
      if (token == undefined) {
        return false;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'https://graph.microsoft.com/oidc/userinfo',
        config,
      );
      if (response.status === 401 || response.status === 403) {
        return false;
      }
      request.user = response.data.email;
    } catch (err) {
      return false;
    }
    return true;
  }
}
