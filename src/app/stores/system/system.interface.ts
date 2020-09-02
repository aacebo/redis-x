export interface ISystem {
  readonly pid: number;
  readonly platform: NodeJS.Platform;
  readonly version: string;
  readonly build: 'development' | 'production';
  readonly fullscreen: boolean;
}
