import {AnalyticsContext} from '../AnalyticsContext';
import {DataMap} from '../types';
import {identity, isDataMap} from './utils';
import {withContext} from './withContext';

export function withIdentities(identities: DataMap) {
  if (!isDataMap(identities)) {
    return identity;
  }

  const newContext = new AnalyticsContext();
  Object.assign(newContext.Identities, identities);
  return withContext(newContext);
}
