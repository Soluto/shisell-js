var AnalyticsDispatcher = require('../AnalyticsDispatcher');

module.exports = function withContext(analyticsContext) {
  return function (dispatcher) {
    return new AnalyticsDispatcher(dispatcher.dispatch, analyticsContext);
  };
};
