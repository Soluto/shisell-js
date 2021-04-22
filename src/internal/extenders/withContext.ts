import {AnalyticsContext} from '../AnalyticsContext';
import {AnalyticsDispatcher} from '../AnalyticsDispatcher';

export function withContext(analyticsContext: Partial<AnalyticsContext>) {
  return <T>(dispatcher: AnalyticsDispatcher<T>) =>
    new AnalyticsDispatcher<T>(
      dispatcher.dispatch.bind(dispatcher),
      analyticsContext instanceof AnalyticsContext
        ? analyticsContext
        : new AnalyticsContext(
            analyticsContext.Scopes,
            analyticsContext.ExtraData,
            analyticsContext.MetaData,
            analyticsContext.Identities,
            analyticsContext.Filters,
          ),
    );
}
