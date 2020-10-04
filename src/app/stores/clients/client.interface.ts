import { IClient as IClientModel } from '../../../electron/models';

export interface IClient extends IClientModel {
  readonly status: 'open' | 'reconnecting' | 'closed';
}
