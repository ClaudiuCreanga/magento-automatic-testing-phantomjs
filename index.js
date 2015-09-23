//include jquery
var fs = require("fs");
var jQuery_path = fs.absolute(fs.workingDirectory + "/jquery.js")
casper.options.clientScripts = [jQuery_path];

//settings
var BASE_URL = "http://"+casper.cli.get('url');

var personal_email = 'claudiu@limesharp.net';

var my_password = 'johndoe123';

var viewportSizes = [
    [1500,900],
    [1280,800],
    [1024,768],
    [600,1024],
    [320,568]
]

//take screenshots? true or false
var get_screenshots = true;

//take responsive screenshots? true or false
var responsive = true;

var screenshots = require("screenshots");
var home = require("homepage");
var login = require("login");
var register = require("register");
var account = require("account");
var log_me = require("log_me_in");
var category = require("category");
var category_add_product = require("category_add_product");
var cart = require("cart");
var checkout = require("checkout");
var success = require("success");

var taking_screenshots = function(page){
	if(get_screenshots){
		if(responsive){
			screenshots.responsive_screenshots(page);
		}
		else{
			screenshots.fixed_width_screenshots(page);
		}
	}
}

casper.start().thenOpen(BASE_URL, function() {
	
	casper.test.comment('\nSTART TEST.' );
	
    home.go_to_homepage();
    login.go_to_login();
    register.go_to_register("me"); //options randon or me for email
    account.go_to_account();
    log_me.log_me_in(personal_email,my_password);
	category.go_to_category();
	category_add_product.add_product();
	cart.go_to_cart();
	checkout.go_to_checkout();
	checkout.order_user_logged("money"); //options money or sagepay
	//checkout.order_user_guest("money");
	success.go_to_success();

	
});

casper.run(function() {
	console.log( '\nTHE END.' );
    this.test.done();
});