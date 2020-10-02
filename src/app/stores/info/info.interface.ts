import { ICpuInfo } from './cpu-info.interface';
import { IMemoryInfo } from './memory-info.interface';
import { IServerInfo } from './server-info.interface';

export interface IInfo {
  readonly cpu: ICpuInfo;
  readonly memory: IMemoryInfo;
  readonly server: IServerInfo;
  readonly elapse: number;
}
