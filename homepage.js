exports.go_to_homepage = function(){
	casper.waitForSelector(".logo", function(){
		this.thenClick('.logo', function() {
		    this.test.info('Current location is ' + this.getCurrentUrl());
			screenshots("homepage");
		});
	})
}