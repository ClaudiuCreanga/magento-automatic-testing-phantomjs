exports.go_to_cart = function(){
	casper.waitForSelector(".btn-cart", function() {
		casper.thenClick('.btn-cart', function() {
			this.exists('#shopping-cart-totals-table');
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Cart page loaded fine');
			screenshots("cart")
		});
	})
}