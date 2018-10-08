import {AnalyticsEventModel} from '../types';

export function addTime(model: AnalyticsEventModel) {
  model.ExtraData.Time = new Date().toISOString();
}
