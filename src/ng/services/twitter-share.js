(function(window) {

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