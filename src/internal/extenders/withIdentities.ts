import {DataMap} from '../types';
import {assertDataMap, identity} from './utils';
import {withContext} from './withContext';

export function withIdentities(identities: DataMap) {
  if (!assertDataMap(identities, 'identities')) {
    return identity;
  }

  return withContext({Identities: identities});
}
