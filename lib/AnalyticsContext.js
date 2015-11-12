module.exports = function AnalyticsContext(){
    var self = this;
    self.Scopes = [];
    self.ExtraData = {};
    self.MetaData = {};
    self.Filters = [];
    self.Identities = {};

    return self;
};
