import { IInfo } from './info.interface';

export interface IInfoState {
  [clientId: string]: IInfo;
}
