exports.category_page = function(){
	casper.then(function() {
		this.click('#nav-desktop a[data-menu="1"]');
		this.click('.submenu-desktop[data-submenu="1"] a');
	});
	
	//Check category
	casper.then(function() {
		this.test.assertTextExists('Red Truffle 21');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Main Category loaded ok');
		screenshots("category")
	});
}