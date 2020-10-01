import { IClient } from '../../../../models/client.model';

export interface IClientFindAllResponse {
  readonly clients: IClient[];
}
