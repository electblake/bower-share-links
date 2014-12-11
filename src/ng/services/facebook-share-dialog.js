(function(window) {

	var openFBSDK_dialog = function($share, cb) {
		FB.ui({
		  method: 'share',
		  href: $share.link,
		}, function(response){
			cb(response);
		});
	};

	var handleFBSDK_dialog = function(response) {

	};
	
	window.ShareLinkServices['facebook'] = {
		open: openFBSDK_dialog
	};

})(window);