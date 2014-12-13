(function(window) {

	var expect = window.chai.expect;

	var openShareURL_popup = function(shareItem, cb) {
		try {
			// share url
			// https://www.facebook.com/dialog/share?app_id={app_id}&display=page&href={url}&redirect_uri={redirect_url}
			expect(shareItem, 'shareItem').to.be.an('object');
			expect(shareItem.link, 'Share Link').to.be.a('string').and.to.have.length.above(0);

			var thisHostURL = new URI(shareItem.link);

			var _defaults = {
				app_id: window.FACEBOOK_APP_ID,
				display: 'popup',
				href: shareItem.link,
				redirect_uri: 'http://' + thisHostURL.host()
			};

			// var popup_url = new URI('http://www.facebook.com/sharer.php');
			var popup_url = new URI('http://www.facebook.com/dialog/share');
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

})(window);