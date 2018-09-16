var deepExtend = require('./deep-extend');
var AnalyticsContext = require('./AnalyticsContext');

function AnalyticsDispatcher(dispatch, context){
    var self = this;
    self.Context = context || new AnalyticsContext();

    self.dispatch = function(eventName, analyticsContext) {
        var unionContext = unionContexts(self.Context, analyticsContext);
        return dispatch(eventName, unionContext);
    };

    function unionContexts(oldContext, newContext){
        var unionContext = {};
        deepExtend(unionContext, oldContext);
        deepExtend(unionContext, newContext || {});
        unionContext.Scopes = unionArrays(oldContext.Scopes,(newContext || {}).Scopes);
        unionContext.Filters = unionArrays(oldContext.Filters,(newContext || {}).Filters);
        return unionContext;
    }

    function unionArrays(first,second){
        if (!first) return second || [];
        if (!second) return first || [];
        return first.concat(second);
    }

    return self;
}

AnalyticsDispatcher.prototype.extend = function () {
    var result = this;
    for (var extender of arguments) {
        result = extender(result);
    }
    return result;
};

module.exports = AnalyticsDispatcher;
