import { LogLevel } from '../enums';

export interface ILog {
  readonly id: string;
  readonly level: LogLevel;
  readonly message: string;
}
