import {withIdentities} from './withIdentities';

export function withIdentity(key: string, value: any) {
  return withIdentities({[key]: value});
}
