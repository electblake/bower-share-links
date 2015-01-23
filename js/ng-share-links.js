window.ShareLinkServices = {};
window.ShareLinkConfig = {};
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
	}]);;'use strict';

var ShareLinks = function() {

	this.FACEBOOK_APP_ID = 'missing';
	
	this.init = function(config) {
 		if (config.FACEBOOK_APP_ID) {
	 		this.FACEBOOK_APP_ID = config.FACEBOOK_APP_ID
 		}
	}

	this.$get = function() {
		return this;
	};
};

angular.module('ngShareLinks')
	.provider('ShareLinks', ShareLinks);;(function(window) {

	var expect = window.chai.expect;

	var openShareURL_popup = function(shareItem, cb) {
		try {
			// share url
			// https://www.facebook.com/dialog/share?app_id={app_id}&display=page&href={url}&redirect_uri={redirect_url}
			expect(shareItem, 'shareItem').to.be.an('object');
			expect(shareItem.link, 'Share Link').to.be.a('string').and.to.have.length.above(0);

			var thisHostURL = new URI(window.location.href);

			var _defaults = {
				app_id: window.FACEBOOK_APP_ID,
				display: 'popup',
				href: shareItem.link,
				link: shareItem.link,
				redirect_uri: 'http://' + thisHostURL.host() + '/close-popup'
			};

			// var popup_url = new URI('http://www.facebook.com/sharer.php');
			var popup_url = new URI('http://www.facebook.com/dialog/feed');
			popup_url.query(_defaults);

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

})(window);;(function(window) {

	var expect = window.chai.expect;

	var openShareURL_popup = function(shareItem, cb) {
		try {
			// share url
			// https://twitter.com/share?url={url}&text={title}&via={via}&hashtags={hashtags}
			expect(shareItem, 'shareItem').to.be.an('object');
			expect(shareItem.link, 'Share Link').to.be.a('string').and.to.have.length.above(0);

			var thisHostURL = new URI();

			var _defaults = {
				// via: '',
				// hashtags: '',
				text: shareItem.title,
				url: shareItem.link
			};

			var popup_url = new URI('https://twitter.com/share');
			popup_url.query(_defaults);

			var window_options = {
				width: null,
				height: null
			};

			var promise = window.nuWindow('twitter-share-popup', popup_url.toString(), window_options);

			return promise;
		} catch (err) {
			console.error(err.message, err.stack);
		}

	};

	// var handleFBSDK_dialog = function(response) {
	// };
	
	window.ShareLinkServices['twitter'] = {
		open: openShareURL_popup
	};

})(window);