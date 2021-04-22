import {withExtras} from './withExtras';

export function withExtra(key: string, value: any) {
  return withExtras({[key]: value});
}
