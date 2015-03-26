;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Subject";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "subject",

        defaults: function () {
            return {
                sort:1,
                isShow: true,
                isDrag: true,
                data: []
            };
        }, 

        initialize: function (args) {
            this.set({
                sort: args.sort,
                isShow: args.isShow,
                isDrag: args.isDrag
            });

            this.setData(args.data);
            this.master = args.master;
        },

        getTableName: function () {
            return "InfoCours";
        },

        format: function (args){
            return {
                id: args.id,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);