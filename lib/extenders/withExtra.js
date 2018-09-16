var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');

module.exports = function withExtra(key, value) {
  var newContext = new AnalyticsContext();
  newContext.ExtraData[key] = value;
  return withContext(newContext);
};
