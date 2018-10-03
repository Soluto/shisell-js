export function identity<T>(x: T): T {
  return x;
}

export function isObject(obj: any) {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function isArray(arr: any) {
  return !!arr && Array.isArray(arr);
}
