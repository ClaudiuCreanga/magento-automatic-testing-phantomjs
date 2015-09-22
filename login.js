exports.go_to_login = function(){
	casper.thenClick('ul.links > li:nth-child(3) > a:nth-child(1)',function() {
		this.test.pass('login page was loaded');
		taking_screenshots("login-page");
	});
}