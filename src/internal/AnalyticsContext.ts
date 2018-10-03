import * as deepmerge from 'deepmerge';
import {AnalyticsEventModel} from './AnalyticsEventModel';
import {DataMap, PromiseOrValue} from './types';

export type AnalyticsFilter = (model: AnalyticsEventModel) => PromiseOrValue<void>;

export class AnalyticsContext {
  readonly Scopes: string[] = [];
  readonly ExtraData: DataMap = {};
  readonly MetaData: DataMap = {};
  readonly Identities: DataMap = {};
  readonly Filters: AnalyticsFilter[] = [];

  union(analyticsContext?: AnalyticsContext): AnalyticsContext {
    if (!analyticsContext) {
      return this;
    }

    const union = new AnalyticsContext();
    Object.entries(union).forEach(([key, target]) => {
      if (typeof target !== 'object') {
        return;
      }

      const value = (this as any)[key];
      const other = (analyticsContext as any)[key];

      if (Array.isArray(target)) {
        target.push(...value, ...other);
      } else {
        const merged = deepmerge(value, other);
        Object.assign(target, merged);
      }
    });

    return union;
  }

  async toEventModel(eventName: string): Promise<AnalyticsEventModel> {
    const eventModel = new AnalyticsEventModel();
    eventModel.Name = eventName;
    eventModel.Scope = this.Scopes.join('_');
    eventModel.ExtraData = deepmerge({}, this.ExtraData);
    eventModel.MetaData = deepmerge({}, this.MetaData);
    eventModel.Identities = deepmerge({}, this.Identities);

    await this.Filters.reduce(async (acc, filter) => {
      await acc;
      await filter(eventModel);
    }, Promise.resolve());

    return eventModel;
  }
}
