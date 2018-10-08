const deepmerge = require('deepmerge');
import {DataMap, PromiseOrValue, AnalyticsEventModel} from './types';

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
    union.Scopes.push(...this.Scopes, ...(analyticsContext.Scopes || []));
    Object.assign(union.ExtraData, deepmerge(this.ExtraData, analyticsContext.ExtraData || {}));
    Object.assign(union.MetaData, deepmerge(this.MetaData, analyticsContext.MetaData || {}));
    Object.assign(union.Identities, deepmerge(this.Identities, analyticsContext.Identities || {}));
    union.Filters.push(...this.Filters, ...(analyticsContext.Filters || []));

    return union;
  }

  async toEventModel(eventName: string): Promise<AnalyticsEventModel> {
    const eventModel: AnalyticsEventModel = {
      Name: eventName,
      Scope: this.Scopes.join('_'),
      ExtraData: deepmerge({}, this.ExtraData),
      MetaData: deepmerge({}, this.MetaData),
      Identities: deepmerge({}, this.Identities),
    };

    await this.Filters.reduce(async (acc, filter) => {
      await acc;
      await filter(eventModel);
    }, Promise.resolve());

    return eventModel;
  }
}
