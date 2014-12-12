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
							service.open(item).then(function(result) {
								console.log('share window result', result);
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
	}]);