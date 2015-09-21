exports.log_me_in = function(personal_email,my_password){
	casper.then(function() {
		
		this.fillSelectors('#login-form', {
		    'input[name="login[username]"]': personal_email,
		    'input[name="login[password]"]': my_password
	    }, true);
	        
	    var nameCount = this.evaluate(function() {
		    var names = $('#login-form #pass')
		    return names.length;
		});
		
		console.log("jquery loaded: "+this.echo(nameCount));
		
		screenshots("login-page-populated");
		
		this.test.pass('form populated');
	    this.test.info('Current location is ' + this.getCurrentUrl());
	    
	})
}