export interface IClientStatusResponse {
  readonly id: string;
  readonly status: 'open' | 'reconnecting' | 'closed';
}
