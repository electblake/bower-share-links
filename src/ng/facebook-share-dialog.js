angular.module('ngShareLinks')
.directive('shareLinkFacebookShareDialog', ['$log', '$element', function($log, $element) {

	var openFBSDK_dialog = function() {
		FB.ui({
		  method: 'share',
		  href: 'https://developers.facebook.com/docs/',
		}, function(response){});
	};

	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {
			element.on('click', function($evt) {
				openFBSDK_dialog();
			});
		}
	};

}]);