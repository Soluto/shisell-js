const deepmerge = require('deepmerge');
import {EventModelWriter} from '../createRootDispatcher';

export function mixpanelWriter(identity: string): EventModelWriter<void> {
  return eventModel => {
    if (typeof mixpanel === 'undefined') {
      return;
    }

    if (eventModel.Identities[identity]) {
      mixpanel.identify(eventModel.Identities[identity]);
    }

    const eventName = [eventModel.Scope, eventModel.Name].filter(x => x).join('_');
    const extra = deepmerge.all([eventModel.Identities, eventModel.ExtraData, eventModel.MetaData]);

    mixpanel.track(eventName, extra);
  };
}
