var deepExtend = require('deep-extend');


module.exports = function(id){
  var writeEvent = function(eventModel){
    if (!mixpanel) return;

    var extra = {}, eventModel.Identities, eventModel.ExtraData, eventModel.MetaData);
    if (eventModel.Identities[id]){
        extra['distinct_id'] = eventModel.Identities[id];
    }

    mixpanel.track(eventModel.Scope + '_' + eventModel.Name, extra);
  };
};
