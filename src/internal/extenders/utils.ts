import {DataMap} from '../types';

export function identity<T>(x: T): T {
  return x;
}

export function isDataMap(obj: unknown): obj is DataMap {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export const isDevelopment = () => typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';
