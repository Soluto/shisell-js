import {DataMap} from '../types';
import {identity, isDataMap, isDevelopment} from './utils';
import {withContext} from './withContext';

export function withIdentities(identities: DataMap) {
  if (!isDataMap(identities)) {
    if (isDevelopment()) {
      throw TypeError("'identities' should be an object");
    }
    return identity;
  }

  return withContext({Identities: identities});
}
