import * as chalk from 'chalk';
import * as uuid from 'uuid';
import { format } from 'date-fns';

import Database from './database';
import { LogLevel } from './enums';

export default class Logger {
  private get _timestamp() {
    const now = new Date();
    return `[${format(now, 'MM/dd/yyyy HH:mm:ss')}]`;
  }

  constructor(private readonly _ctx: string) { }

  info(msg: string, ...ctxArgs: string[]) {
    console.info(chalk.cyan(`${this._timestamp}[${this._ctx}${this._getSubContext(ctxArgs)}] > ${msg}`));
  }

  warn(msg: string, ...ctxArgs: string[]) {
    console.warn(chalk.yellow(`${this._timestamp}[${this._ctx}${this._getSubContext(ctxArgs)}] > ${msg}`));
  }

  error(msg: string, ...ctxArgs: string[]) {
    console.error(chalk.red(`${this._timestamp}[${this._ctx}${this._getSubContext(ctxArgs)}] > ${msg}`));
    Database.instance.logs.create({ id: uuid.v4(), level: LogLevel.Error, message: msg });
  }

  private _getSubContext(ctxArgs?: string[]) {
    let str = '';

    for (const ctx of ctxArgs) {
      str += `:${ctx}`;
    }

    return str;
  }
}
