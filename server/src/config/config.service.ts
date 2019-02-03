import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

interface ConfiguraitonVaraibles {
  privateVapidKey: string;
  publicVapidKey: string;
  vapidSubject: string;
}

@Injectable()
export class ConfigService {
  public readonly vars: ConfiguraitonVaraibles = {
      privateVapidKey: '',
      publicVapidKey: '',
      vapidSubject: '',
  };

  constructor() {
    const fileContents = fs.readFileSync('./config.json').toString();
    const data = JSON.parse(fileContents);
    this.vars.privateVapidKey = data.privateVapidKey || process.env.VAPID_PRIVATE_KEY;
    this.vars.publicVapidKey = data.publicVapidKey || process.env.VAPID_PUBLIC_KEY;
    this.vars.vapidSubject = data.vapidSubject || process.env.VAPID_SUBJECT;
  }
}
