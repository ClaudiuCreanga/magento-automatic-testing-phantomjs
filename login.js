exports.go_to_login = function(){
	casper.thenClick('.test-account',function() {
		this.test.pass('login page was loaded');		
	});
}