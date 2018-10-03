import {EventModelWriter} from '../createRootDispatcher';

export const consoleWriter: EventModelWriter<void> = eventModel => {
  console.log(JSON.stringify(eventModel));
};
