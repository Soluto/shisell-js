var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');

module.exports = function createScoped(scope) {
  var newContext = new AnalyticsContext();
  newContext.Scopes.push(scope);
  return withContext(newContext);
};
