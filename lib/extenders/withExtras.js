var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');
var identity = require('./utils/identity');

module.exports = function withExtras(extras) {
  if (!extras || (typeof extras !== 'object')) return identity;

  var newContext = new AnalyticsContext();
  newContext.ExtraData = extras;
  return withContext(newContext);
};
