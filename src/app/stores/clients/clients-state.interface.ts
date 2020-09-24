import { IClient } from './client.interface';

export interface IClientsState {
  [id: string]: IClient;
}
