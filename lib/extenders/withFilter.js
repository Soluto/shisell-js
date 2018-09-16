var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');
var identity = require('./utils/identity');

module.exports = function withFilter (filter){
  if (!filter) return identity;

  var newContext = new AnalyticsContext();
  newContext.Filters.push(filter);
  return withContext(newContext);
};
