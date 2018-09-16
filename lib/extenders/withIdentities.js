var AnalyticsContext = require('../AnalyticsContext');
var withContext = require('./withContext');
var identity = require('./utils/identity');

module.exports = function withIdentities(identities) {
  if (!identities || (typeof identities !== 'object')) return identity;

  var newContext = new AnalyticsContext();
  newContext.Identities = identities;
  return withContext(newContext);
};
