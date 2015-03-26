;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Prize";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "prize",

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
            return "InfoPrize";
        },

        format: function (args){
            return {
                id: args.id,
                name: args.name,
                jibie: args.jibie,
                dateY: args.dateY,
                dateM: args.dateM
            };
        }
    }));
})(WE, jQuery, Backbone);