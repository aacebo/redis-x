import { IClient } from '../../../models/clients.model';

export interface IRedisFindAllResponse {
  readonly clients: IClient[];
}
