import {DataMap} from '../types';
import {assertDataMap, identity} from './utils';
import {withContext} from './withContext';

export function withExtras(extras: DataMap) {
  if (!assertDataMap(extras, 'extras')) {
    return identity;
  }

  return withContext({ExtraData: extras});
}
