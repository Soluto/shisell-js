import {AnalyticsEventModel} from '../AnalyticsEventModel';

export function addTime(model: AnalyticsEventModel) {
  model.ExtraData.Time = new Date().toISOString();
}
