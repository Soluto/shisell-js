var AnalyticsDispatcher = require('./AnalyticsDispatcher');
var extenders = require('./extenders');

module.exports = function() {
  Object.keys(extenders).forEach(function (name) {
    var extender = extenders[name];

    AnalyticsDispatcher.prototype[name] = function () {
      console.warn('AnalyticsDispatcher.' + name + ' is deprecated, use AnalyticsDispatcher.extend('+name+'(arguments)) instead');
      return this.extend(extender.apply(this, arguments))
    }

  });
};
