exports.success_page = function(){
	casper.then(function() {
		casper.waitForSelector(".success", function(){
			screenshots("success")
		    this.test.info('Current location is ' + this.getCurrentUrl());
		})
	});
}