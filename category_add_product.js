exports.add_product = function(){
	
	// Add a product to basket from category page
	casper.thenClick('.category-new-options .small', function() {
		this.wait(3000, function() {
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Product added successfully');
			screenshots("ajax");
			//this.test.assertTextExists('Added to your bag');
		})
	});
}