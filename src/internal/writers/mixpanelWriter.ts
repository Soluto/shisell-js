import * as deepmerge from 'deepmerge';
import {EventModelWriter} from '../createRootDispatcher';

export function mixpanelWriter(id: string): EventModelWriter<void> {
  return eventModel => {
    if (!mixpanel) {
      return;
    }

    const extra = deepmerge.all([eventModel.Identities, eventModel.ExtraData, eventModel.MetaData]);
    if (eventModel.Identities[id]) {
      mixpanel.identify(eventModel.Identities[id]);
    }

    const eventName = eventModel.Name ? `${eventModel.Scope}_${eventModel.Name}` : eventModel.Scope;

    mixpanel.track(eventName, extra);
  };
}
