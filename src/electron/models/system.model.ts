export interface ISystem {
  readonly pid: number;
  readonly platform: NodeJS.Platform;
  readonly version: string;
  readonly build: 'production' | 'development';
  readonly fullscreen: boolean;
}
