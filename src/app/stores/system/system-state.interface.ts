import { ISystem } from '../../../electron/models';

export interface ISystemState {
  readonly system?: ISystem;
  readonly updateAvailable?: boolean;
}
