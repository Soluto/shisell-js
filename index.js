var AnalyticsContext = require('./lib/AnalyticsContext');
var AnalyticsDispatcher = require('./lib/AnalyticsDispatcher');
var createRootDispatcher = require('./lib/createRootDispatcher');
var extenders = require('./lib/extenders');
var writers = require('./lib/writers');
var legacySupport = require('./lib/legacySupport');

module.exports = {
  AnalyticsContext: AnalyticsContext,
  AnalyticsDispatcher: AnalyticsDispatcher,
  createRootDispatcher: createRootDispatcher,
  extenders: extenders,
  writers: writers,
  legacySupport: legacySupport,
  ext: AnalyticsDispatcher.prototype
};
