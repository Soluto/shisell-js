import {DataMap} from '../types';

export function identity<T>(x: T): T {
  return x;
}

export function isDataMap(obj: unknown): obj is DataMap {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export const isDevelopment = () => typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';

export function assertDataMap(obj: unknown, name: string): obj is DataMap {
  if (!isDataMap(obj)) {
    if (isDevelopment()) {
      throw TypeError(`'${name}' should be an object`);
    }
    return false;
  }

  return true;
}
