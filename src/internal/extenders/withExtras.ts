import {DataMap} from '../types';
import {identity, isDataMap, isDevelopment} from './utils';
import {withContext} from './withContext';

export function withExtras(extras: DataMap) {
  if (!isDataMap(extras)) {
    if (isDevelopment()) {
      throw TypeError("'extras' should be an object");
    }

    return identity;
  }

  return withContext({ExtraData: extras});
}
