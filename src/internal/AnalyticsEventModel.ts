import {DataMap} from './types';

export class AnalyticsEventModel {
  Name: string = '';
  Scope: string = '';
  ExtraData: DataMap = {};
  MetaData: DataMap = {};
  Identities: DataMap = {};
}
