import deepmerge from 'deepmerge';
import {DataMap, PromiseOrValue, AnalyticsEventModel} from './types';

export type AnalyticsFilter = (model: AnalyticsEventModel) => PromiseOrValue<void>;

export class AnalyticsContext {
  constructor(
    readonly Scopes: string[] = [],
    readonly ExtraData: DataMap = {},
    readonly MetaData: DataMap = {},
    readonly Identities: DataMap = {},
    readonly Filters: AnalyticsFilter[] = [],
  ) {}

  union(analyticsContext?: Partial<AnalyticsContext>): AnalyticsContext {
    if (!analyticsContext) {
      return this;
    }

    return new AnalyticsContext(
      this.Scopes.concat(analyticsContext.Scopes || []),
      deepmerge(this.ExtraData, analyticsContext.ExtraData || {}),
      deepmerge(this.MetaData, analyticsContext.MetaData || {}),
      deepmerge(this.Identities, analyticsContext.Identities || {}),
      this.Filters.concat(analyticsContext.Filters || []),
    );
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
