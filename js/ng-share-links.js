window.ShareLinkServices = {};
angular.module('ngShareLinks', [])
	.directive('shareType', ['$log', '$q', function($log, $q) {
		return {
			restrict: 'A',
			scope: {
				shareType: '@',
				shareItem: '='
			},
			link: function postLink(scope, element, attrs) {
				
				var expect = window.chai.expect;

				try {

					expect(scope.shareType, 'Share-Type').to.be.a('string').and.to.have.length.above(0);
					expect(scope.shareItem, 'Share-Item').to.be.an('object');

					var type = scope.shareType,
						item = scope.shareItem;

					var service = window.ShareLinkServices[type];

					// $log.debug('window.ShareLinkServices', window.ShareLinkServices);
					
					expect(service, 'Share Link Service').to.be.an('object');

					element.on('click', function($evt) {
						$evt.stopPropagation();
						try {
							service.open(item)
								.then(function(result) {
									console.log('share window result', result);
								})
								.catch(function(err) {
									throw err;
								});
						} catch (err) {
							// problem opening service sharer
						}
						return false;
					});

				} catch (err) {
					$log.debug('skipped share-link directive', err);
				}
			}
		};
	}]);;(function(window) {

	var expect = window.chai.expect;

	var openShareURL_popup = function(shareItem, cb) {
		try {
			// share url
			// https://www.facebook.com/dialog/share?app_id={app_id}&display=page&href={url}&redirect_uri={redirect_url}
			expect(shareItem, 'shareItem').to.be.an('object');
			expect(shareItem.link, 'Share Link').to.be.a('string').and.to.have.length.above(0);

			var _defaults = {
				app_id: 1234,
				display: 'popup',
				url: shareItem.link,
				redirect_uri: null
			};

			var popup_url = new URI('https://www.facebook.com/dialog/share');
			// popup_url.query(_defaults);

			var window_options = {
				width: null,
				height: null
			};

			var promise = window.nuWindow('facebook-share-popup', popup_url.toString(), window_options);

			return promise;
		} catch (err) {
			console.error(err.message, err.stack);
		}

	};

	// var handleFBSDK_dialog = function(response) {
	// };
	
	window.ShareLinkServices['facebook'] = {
		open: openShareURL_popup
	};

})(window);