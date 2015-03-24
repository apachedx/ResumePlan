/******************************* **************************************************************
头像上传组件
 2014.08.04
 AeroJin 
 ***********************************************************************************************/
;
(function ($, _, WE) {
    WE.namespace("WE.Upload", function (options) {
        var _this = this;

        this.image = options.image;        
        this.callback = options.callback;
        this.upLoadFile = options.upLoadFile;
        this.funName = options.funName || '_myPicture_';

        this.TIP = {
			PICUPLOAD_ERROR :"图像格式不符合规范!",
			SUCCESS : "您的头像已保存",
			FIAL : "您的头像保存失败"
        };

        this.init = function() {
            this.ui = {};
            this.ui.body = $('body');
            this.ui.file = this.upLoadFile;
            this.ui.parent = this.ui.file.parent();
            this.ui.form = $('<form id="frmUpload" name="frmUpload" method="post" enctype="multipart/form-data" action="" target="ifrmReturnInfo"></form>');
            this.ui.iframe = $('<iframe id="ifrmReturnInfo" name="ifrmReturnInfo" scrolling="no" height="0" width="0" frameborder="0"></iframe>');

            this.ui.file.attr('name', 'fileUpload');
            this.ui.form.attr("action", this.getUploadUrl());
            this.ui.body.append(this.ui.form);
            this.ui.body.append(this.ui.iframe);
            this.regEvent();
        };

        this.regEvent = function() {
        	var _this = this;

        	window[this.funName] = function(result) {
        		var code = result.status || "";
				var msg = result.info || "";

				if (code == 1) {
					var url = '{0}?rd={1}'.format(result.data.photo, Math.random());
					
					if(_this.image){
						_this.image.attr('src', url);
					}

					if(_this.callback){
						_this.callback({photo: result.data.photo});
					}
					
					_this.ui.parent.append(_this.ui.file);
					WE.UI.alert(_this.TIP.SUCCESS);
				} else {
                    _this.ui.parent.append(_this.ui.file);
                    WE.UI.alert(msg);					
				}
        	};

        	this.ui.file.change(function(){
        		var fileName = $(this).val();

        		if(_this.check(fileName)){
        			_this.ui.form.append(_this.ui.file);
        			_this.ui.form.submit();
        		}
        	});
        };

        this.check = function(fileName) {
        	if (!/\.(?:jpg|jpeg|gif|png|bmp)$/i.test(fileName)) {
				WE.UI.alert(this.TIP.PICUPLOAD_ERROR);
				this.ui.form.reset();
				return false;
			}

			return true;
        };

        //获取上传地址，测试环境与生产环境不同
        this.getUploadUrl = function() {
        	if(!this.url){
	        	var domain = document.domain;
                var token = $.cookie(WE.Constant.COOKIE_TOKEN);
	        	this.url = "http://{0}/api.php?m=common&a=upload&token={1}&fun_name={2}";
	        	this.url = this.url.format(domain, token, this.funName);
	        }

			return this.url;
        };

        this.init();
    });
})(jQuery, _, WE);