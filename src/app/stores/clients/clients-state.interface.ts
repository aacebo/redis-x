import { IClient } from './client.interface';

export interface IClientsState {
  readonly active?: string;
  readonly clients: { [id: string]: IClient; };
}
