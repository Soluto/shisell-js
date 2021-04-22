import {withContext} from './withContext';

export function withMeta(key: string, value: any) {
  return withContext({MetaData: {[key]: value}});
}
