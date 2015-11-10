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

    return Promise.all(context.Filters.map(function(filter) {
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
    	return Promise.resolve()
    		.then(function () {
    			return createEventModel(name,context);
    		})
    		.then(function (eventModel){
    			return eventModelWriter(eventModel);
    		});
    }, rootContext);
};

module.exports = {
    AnalyticsContext: AnalyticsContext,
    AnalyticsEventModel: AnalyticsEventModel,
    AnalyticsDispatcher: AnalyticsDispatcher,
    createRootDispatcher: createDispatcherWriter
};
