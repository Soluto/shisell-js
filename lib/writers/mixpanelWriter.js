var deepExtend = require('deep-extend');


module.exports = function(id){
  return function(eventModel){
    if (!mixpanel) return;

    var extra = deepExtend({}, eventModel.Identities, eventModel.ExtraData, eventModel.MetaData);
    var previousDistinctId;
    if (eventModel.Identities[id]){
      mixpanel.identify(eventModel.Identities[id]);
    }
    
    mixpanel.track(eventModel.Scope + '_' + eventModel.Name, extra);
  };
};
