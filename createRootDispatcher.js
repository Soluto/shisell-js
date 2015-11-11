var Promise = require('bluebird');
var deepExtend = require('deep-extend');

var AnalyticsContext = require('./AnalyticsContext');
var AnalyticsEventModel = require('./AnalyticsEventModel');
var AnalyticsDispatcher = require('./AnalyticsDispatcher');

var createEventModel = function(eventName, context){
  var eventModel = new AnalyticsEventModel();
  eventModel.Name = eventName;
  eventModel.Scope = context.Scopes.join("_");

  deepExtend(eventModel.ExtraData, context.ExtraData);
  deepExtend(eventModel.MetaData, context.MetaData);
  return context.Filters.reduce(function(cur, next) {
    return cur.then(
      function(){
        return next(eventModel);
      });
    }, Promise.resolve())
    .then(function() {
      return eventModel;
    });
};

module.exports = function(eventModelWriter, rootContext) {
  return new AnalyticsDispatcher(function(name, context)
  {
    return Promise.resolve()
    .then(function () {
      return createEventModel(name,context);
    })
    .then(function (eventModel){
      return eventModelWriter(eventModel);
    });
  }, rootContext);
};
