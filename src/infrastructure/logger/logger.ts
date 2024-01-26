import { LoggingService } from "./dtos/logger.dto";

export class Logger implements LoggingService {
  constext: string;
  constructor(context: string) {
    this.constext = context;
  }

  info(...message: any[]) {
    console.info(`[${this.constext}]` + message);
  }
  log(...message: any[]) {
    console.log(`[${this.constext}]` + message);
  }
  warn(...message: any[]) {
    console.warn(`[${this.constext}]` + message);
  }
  error(...message: any[]) {
    console.error(`[${this.constext}]` + message);
  }
}
