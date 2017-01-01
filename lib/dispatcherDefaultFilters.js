module.exports = [
        function(model){
                        return Promise.resolve()
                          .then(function(){
                            model.ExtraData["Time"] = new Date().toISOString();
                          });
                        }
    ];
