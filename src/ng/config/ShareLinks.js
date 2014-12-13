'use strict';

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
	.provider('ShareLinks', ShareLinks);