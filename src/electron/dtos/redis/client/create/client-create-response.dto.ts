export interface IClientCreateResponse {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly password?: string;
  readonly status: 'open' | 'reconnecting' | 'closed';
}
