import * as chalk from 'chalk';
import { format } from 'date-fns';

export default class Logger {
  private static get _timestamp() {
    const now = new Date();
    return `[${format(now, 'MM/dd/yyyy HH:mm:ss')}]`;
  }

  static info(ctx: string, msg: string) {
    console.info(chalk.cyan(`${this._timestamp}[${ctx}] -> ${msg}`));
  }

  static warn(ctx: string, msg: string) {
    console.warn(chalk.yellow(`${this._timestamp}[${ctx}] -> ${msg}`));
  }

  static error(ctx: string, msg: string) {
    console.error(chalk.red(`${this._timestamp}[${ctx}] -> ${msg}`));
  }
}
