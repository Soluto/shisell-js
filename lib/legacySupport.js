var AnalyticsDispatcher = require('./AnalyticsDispatcher');
var extenders = require('./extenders');

Object.keys(extenders).forEach(function (name) {
  var extender = extenders[name];
  var shouldWarn = !process || process.env.NODE_ENV !== 'production';

  AnalyticsDispatcher.prototype[name] = function () {
    if (shouldWarn) {
      console.warn('AnalyticsDispatcher.' + name + ' is deprecated, use AnalyticsDispatcher.extend(' + name + '(arguments)) instead');
      shouldWarn = false;
    }
    return this.extend(extender.apply(this, arguments));
  };

});
