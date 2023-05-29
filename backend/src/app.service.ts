import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    this.mailerService
      .sendMail({
        to: 'aman.r@incubyte.co',
        from: 'fineartgallery06@gmail.com',
        subject: 'Testing Nest MailerModule ✔',

        html: '<b>welcome</b>',
      })
      .then(() => {
        console.log('first');
      })
      .catch((e) => {
        console.log(e);
      });
    return 'Hello World!';
  }
}
