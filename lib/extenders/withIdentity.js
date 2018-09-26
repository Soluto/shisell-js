var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');

module.exports = function withIdentity(key, value) {
  var newContext = new AnalyticsContext();
  newContext.Identities[key] = value;
  return withContext(newContext);
};
