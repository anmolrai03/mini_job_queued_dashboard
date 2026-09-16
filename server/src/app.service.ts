import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello I am Anmol Rai and this is my Mini-Job-Queued-Dashboard Assignment.';
  }
}
