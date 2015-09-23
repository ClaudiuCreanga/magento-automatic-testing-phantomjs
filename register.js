exports.go_to_register = function(email){
		
	//Go to register page
	casper.then(function() {
	    this.click('.test-create-account');
		this.test.pass('register page was loaded');
		screenshots("register")
	});
	
	// Register for a new account	
	// Fill login form and submit
	casper.then(function() {
	    this.test.info('Current location is ' + this.getCurrentUrl());
	    this.fill('#form-validate', {
	        'firstname': 'automated',
	        'lastname': 'test'
	    }, false);
	    
	    switch(email){
		    
		    case "random":
		    
    	    this.fill('#form-validate', {
		        'email': (Math.random()+1).toString(36).substring(7)+'@limesharp.net', //generate a random email
		    }, false);
		    
		    break;
		    
		    case "me":
		    
    	    this.fill('#form-validate', {
	        	'email': personal_email, //generate a random email
		    }, false);	  
		    
		    break;
		    
		    default:
		    
		    console.log("This is the email used on register page:"+email);
		     
	    }
	    
	    this.fill('#form-validate', {
	    
	        'password': 'johndoe123',
	        'confirmation': 'johndoe123'
	        
	    }, true);
	    
		this.test.pass('form populated');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Registered');
		screenshots("register-populated")
	});
}