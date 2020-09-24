import { snakeToCamelCase } from './snake-to-camel-case.util';

export function parseRedisInfo(info: string) {
  const lns = info.split('\r\n');
  const obj: any = { };
  let key: string;

  for (const ln of lns) {
    if (ln.charAt(0) === '#') {
      key = snakeToCamelCase(ln.split(' ')[1].toLowerCase());

      obj[key] = { };
    } else {
      const pair = ln.split(':');

      if (pair?.length === 2) {
        obj[key][snakeToCamelCase(pair[0])] = pair[1];
      }
    }
  }

  return obj;
}
