export interface IServerInfo {
  readonly archBits: string;
  readonly atomicvarApi: string;
  readonly configFile: string;
  readonly configuredHz: string;
  readonly executable: string;
  readonly gccVersion: string;
  readonly hz: string;
  readonly lruClock: string;
  readonly multiplexingApi: string;
  readonly os: string;
  readonly processId: string;
  readonly redisBuildId: string;
  readonly redisGitDirty: string;
  readonly redisGitSha1: string;
  readonly redisMode: string;
  readonly redisVersion: string;
  readonly runId: string;
  readonly tcpPort: string;
  readonly uptimeInDays: string;
  readonly uptimeInSeconds: string;
}
