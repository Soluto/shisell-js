var AnalyticsContext = require('./AnalyticsContext');
var AnalyticsDispatcher = require('./AnalyticsDispatcher');
var createRootDispatcher = require('./createRootDispatcher');
var consoleWriter = require('./writers/consoleWriter');
var mixpanelWriter = require('./writers/mixpanelWriter');

module.exports = {
  AnalyticsContext: AnalyticsContext,
  AnalyticsDispatcher: AnalyticsDispatcher,
  createRootDispatcher: createRootDispatcher,
  writers: {
    console: consoleWriter,
    mixpanel: mixpanelWriter
  }
};
