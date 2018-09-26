var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');

module.exports = function withMeta(key, value) {
  var newContext = new AnalyticsContext();
  newContext.MetaData[key] = value;
  return withContext(newContext);
};
