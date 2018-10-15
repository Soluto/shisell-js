export interface DataMap {
  [key: string]: any;
}
export type PromiseOrValue<T> = Promise<T> | T;

export type AnalyticsEventModel = {
  Name: string;
  Scope: string;
  ExtraData: DataMap;
  MetaData: DataMap;
  Identities: DataMap;
};
