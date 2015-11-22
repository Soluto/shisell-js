var AnalyticsContext = require('./lib/AnalyticsContext');
var AnalyticsDispatcher = require('./lib/AnalyticsDispatcher');
var createRootDispatcher = require('./lib/createRootDispatcher');
var consoleWriter = require('./lib/writers/consoleWriter');
var mixpanelWriter = require('./lib/writers/mixpanelWriter');

module.exports = {
  AnalyticsContext: AnalyticsContext,
  AnalyticsDispatcher: AnalyticsDispatcher,
  createRootDispatcher: createRootDispatcher,
  writers: {
    console: consoleWriter,
    mixpanel: mixpanelWriter
  },
  ext: AnalyticsDispatcher.prototype
};
