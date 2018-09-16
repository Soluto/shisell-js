var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');
var identity = require('./utils/identity');

module.exports = function withFilters(filters) {
  if (!filters) return identity;

  var newContext = new AnalyticsContext();
  newContext.Filters.push.apply(newContext.Filters, filters);
  return withContext(newContext);
};
