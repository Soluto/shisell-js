module.exports = function AnalyticsEventModel(){
    var self = this;
    self.Scope = "";
    self.Name = "";
    self.MetaData = {};
    self.ExtraData = {};
    self.Identities = {};

    this.fullName = function(){
        return self.Scope != "" ? self.Scope + self.Name : self.Name;
    };

    return self;
};