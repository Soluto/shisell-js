var Promise = require('bluebird');
var deepExtend = require('deep-extend');

var AnalyticsContext = require('./AnalyticsContext');
var AnalyticsEventModel = require('./AnalyticsEventModel');
var AnalyticsDispatcher = require('./AnalyticsDispatcher');

var createEventModel = function(eventName, context){
    var eventModel = new AnalyticsEventModel();
    eventModel.Name = eventName;
    eventModel.Scope = context.Scope;

    deepExtend(eventModel.ExtraData, context.ExtraData);
    deepExtend(eventModel.MetaData, context.MetaData);

    Promise.all(context.Filters.map(function(filter) {
        try{
            return Promise.resolve(filter(eventModel)).catch(function () {});
        }
        catch(e) {
            return Promise.resolve(null);
        }
    }))
        .then(function () {
            return eventModel;
        })
};

var createDispatcherWriter = function(eventModelWriter, rootContext) {
    return new AnalyticsDispatcher(function(name, context)
    {
        return eventModelWriter(createEventModel(name,context));
    }, rootContext)
};

module.exports = {
    AnalyticsContext: AnalyticsContext,
    AnalyticsEventModel: AnalyticsEventModel,
    AnalyticsDispatcher: AnalyticsDispatcher,
    createRootDispatcher: createDispatcherWriter
};