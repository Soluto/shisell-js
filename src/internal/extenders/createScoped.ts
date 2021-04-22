import {withContext} from './withContext';

export function createScoped(scope: string) {
  return withContext({Scopes: [scope]});
}
