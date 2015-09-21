exports.account_dashboard = function(){
	
	// Account dashboard welcome
	casper.then(function() {
		this.test.assertTextExists('Hello, automated test!', 'page body contains "Hello, automated test!"');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Dashboard in');
		screenshots("account-dashboard")
	});
}