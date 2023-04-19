import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById(
    id: string,
  ):
    | import('.prisma/client').User
    | PromiseLike<import('.prisma/client').User> {
    throw new Error('Method not implemented.');
  }
}
