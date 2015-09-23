exports.responsive_screenshots = function(page){
    casper.each(viewportSizes, function(self, viewportSize, i) {
 
	    // set two vars for the viewport height and width as we loop through each item in the viewport array
	    var width = viewportSize[0],
	        height = viewportSize[1];
	 
	    //give some time for the page to resize
	    casper.wait(1, function() {
	 
	        //set the viewport to the desired height and width
	        this.viewport(width, height);
	 
			casper.viewport(width, height).then(function() {
	 
	              this.capture('screenshots/'+page+'-'+width+'.png')
	
	        });
	    });
    
	});
	casper.viewport(1500,900);
}

exports.fixed_width_screenshots = function(page){
 
	this.viewport(1280,800);
	
    casper.wait(1, function() {
 	 
		this.capture('screenshots/'+page+'-fixed-1280.png')

    });
}