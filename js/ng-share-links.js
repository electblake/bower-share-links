window.ShareLinkServices = {};
angular.module('ngShareLinks', [])
	.directive('shareType', ['$log', function($log) {
		return {
			restrict: 'A',
			scope: {
				shareType: '@',
				$share: '=shareLink'
			},
			link: function postLink(scope, element, attrs) {
				
				var type = scope.shareType;
				var $share = scope.$share;
				// var service = window.ShareLinkServices[scope.shareType];

				$log.debug('window.ShareLinkServices', window.ShareLinkServices);
				// $log.debug('$share', $share);

				element.on('click', function($evt) {
					// service.open();
					$evt.stopPropagation();
					return false;
				});
			}
		};
	}]);;(function(window) {

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