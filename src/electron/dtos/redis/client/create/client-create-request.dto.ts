export interface IClientCreateRequest {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly password?: string;
}
