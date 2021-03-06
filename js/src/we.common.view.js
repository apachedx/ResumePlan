;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Common.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function () {
            this.render();
            this.initLogin();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnWeixin.hover(function() {
                _this.ui.divWeixin.show();
            },function () {
                _this.ui.divWeixin.hide();
            });

            this.ui.btnUser.mouseenter(function () {
                if(_this.userTimer){
                    clearTimeout(_this.userTimer);
                }

                _this.ui.boxUser.show();
                $(this).addClass("focus");
            });

            this.ui.btnUser.mouseleave(function () {

                _this.userTimer = setTimeout(function () {
                    _this.ui.boxUser.hide();
                    _this.ui.btnUser.removeClass("focus");
                }, 300);
            });

            this.ui.boxUser.mouseenter(function () {
                if(_this.userTimer){
                    clearTimeout(_this.userTimer);
                }
                
                _this.ui.boxUser.show();
            });

            this.ui.boxUser.mouseleave(function () {
                _this.userTimer = setTimeout(function () {
                    _this.ui.boxUser.hide();
                }, 300);
            });

            this.ui.userLogout.click(function () {
                _this.logout();
            });

            this.ui.btnScroll.click(function () {
                $("body").animate({scrollTop: 0}, 500);
            });

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();

                if(scrollTop > 150){
                    _this.ui.btnScroll.show();
                    return;
                }
                
                _this.ui.btnScroll.hide();
            });

            if(this.ui.topHead.length > 0){
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var height = _this.ui.topHead.height();

                    if(scrollTop > height){
                        _this.ui.topHead.addClass("headerTopFixed");
                    }else{
                        _this.ui.topHead.removeClass("headerTopFixed");
                    }

                    
                });
            }
        },

        render: function () {
            this.ui = {};
            this.ui.btnSina = $("#btn-sina");
            this.ui.btnWeixin = $("#btn-weixin");
            this.ui.divWeixin = $("#div-weixin");
            this.ui.appLogin = $("#app-login");
            this.ui.btnUser = $("#btn-user");
            this.ui.userPhoto = $("#user-photo");
            this.ui.userName = $("#user-name");
            this.ui.boxUser = $("#box-user");
            this.ui.topHead = $("#top-head");
            this.ui.userLogout = $("#user-logout");
            this.ui.btnScroll = $("#btn-scroll-top");

            //设置新浪连接
            this.ui.btnSina.attr("href", this.getUrl());

            this.ui.btnScroll.hide();
        },
        initLogin: function () {
            if(this.isLogin()){
                var info = this.getUserInfo();

                this.ui.userName.text(info.username);

                if(info.photo.trim().length > 0){
                    this.ui.userPhoto.find("img").attr("src", info.photo).show();
                }

                this.ui.appLogin.hide();
                this.ui.btnUser.show();

                this.ui.userName.attr({href: "user_center.html"});
                this.ui.userPhoto.attr({href: "user_center.html"});
            }
        },
        isLogin: function () {
            var info = this.getUserInfo();

            return info.token.trim().length > 0 && info.username.trim().length > 0;
        },
        getUserInfo: function () {
            var photo = $.cookie(WE.Constant.COOKIE_PHOTO) || "";
            var username = $.cookie(WE.Constant.COOKIE_USER) || "";
            var token = $.cookie(WE.Constant.COOKIE_TOKEN) || "";

            return {
                token: token,
                photo: photo,
                username: username
            };
        },
        logout: function () {
            var options = {
                data: {}
            };

            options.success = function (result) {
                $.cookie(WE.Constant.COOKIE_USER, null);
                $.cookie(WE.Constant.COOKIE_USERID, null);
                $.cookie(WE.Constant.COOKIE_PHOTO, null);
                $.cookie(WE.Constant.COOKIE_TOKEN, null);

                window.location.reload();
            };

            options.error = function (result) {
                $.cookie(WE.Constant.COOKIE_USER, null);
                $.cookie(WE.Constant.COOKIE_USERID, null);
                $.cookie(WE.Constant.COOKIE_PHOTO, null);
                $.cookie(WE.Constant.COOKIE_TOKEN, null);

                window.location.reload();
            };

            WE.Api.Logout(options, this);
        },
        getUrl: function () {
            return "http://weibo.com/p/1005053628584907/home?from=page_100505&mod=TAB#place";
        }

    }));

    $(function () {
        window.$App.User = new WE.Common.View();
    });

})(WE, jQuery, Backbone);