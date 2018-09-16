var consoleWriter = require('./consoleWriter');
var mixpanelWriter = require('./mixpanelWriter');

module.exports = {
  console: consoleWriter,
  mixpanel: mixpanelWriter,
};
