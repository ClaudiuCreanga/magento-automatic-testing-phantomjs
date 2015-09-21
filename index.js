casper.options.clientScripts = ["/Users/Claudiu/experiments/tests/jquery.js"]

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

function screenshots(page){
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

function to_homepage(){
	// Go to a category
	casper.waitForSelector(".logo", function(){
		this.thenClick('.logo', function() {
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Homepage in');
			screenshots("homepage")
		});
	})
}

function login_page(){
	
	// Go to login page
	casper.thenClick('ul.links > li:nth-child(3) > a:nth-child(1)',function() {
		this.test.pass('login page was loaded');
		screenshots("login-page")
	});
}

function log_me_in(personal_email,my_password){
	// Fill login form and submit
	casper.then(function() {
	    this.test.info('Current location is ' + this.getCurrentUrl());
	    casper.wait(5000, function(){
		    this.fillSelectors('#login-form', {
			    'input[name="login[username]"]': personal_email,
			    'input[name="login[password]"]': my_password
		    }, true);
	    })
	    
	    var nameCount = this.evaluate(function() {
		    var names = $('#login-form #pass')
		    return names.length;
		});
		this.echo(nameCount);
		
		screenshots("login-page-populated");
		this.test.pass('form populated');
	    this.test.info('Current location is ' + this.getCurrentUrl());
	})
}

function register_page(email){
	
	//Go to register page
	casper.then(function() {
	    this.click('.second-block button.small:nth-child(1)');
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

function account_page(){
	
	// Account dashboard welcome
	casper.then(function() {
	    //this.test.assertTextExists('Hello, stamba stambic!');
		this.test.assertTextExists('Hello, automated test!', 'page body contains "Hello, automated test!"');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Dashboard in');
		screenshots("account-dashboard")
	});
}

function category_page(){
	
	//go to category
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

function add_product(){
	
	// Add a product to basket
	casper.then(function() {
	    this.evaluate(function() {
		    $('.ajax-add-to-cart')[0].click()
		});
	});
		
	casper.thenClick('.category-new-options .small', function() {
		this.wait(3000, function() {
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Product added successfully');
			screenshots("ajax");
			//this.test.assertTextExists('Added to your bag');
		})
	});
}

function cart_page(){
	
	// Go to cart page
	casper.waitForSelector(".btn-cart", function() {
		casper.thenClick('.btn-cart', function() {
			this.exists('#shopping-cart-totals-table');
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('Cart page loaded fine');
			screenshots("cart")
		});
	})
}

function checkout_page(){
	
	// Go to checkout page
	casper.thenClick('.checkout-types > li:nth-child(1) > button:nth-child(1)', function() {
		this.test.assertTextExists('Billing address');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Checkout page loaded ok');
		screenshots("checkout")
	});
}

function order_user_logged(checkout_option){
	
	// Make a test order
	casper.then(function(checkout_option) {
		casper.capture('screenshots/amazon-search-2.png');
		casper.waitForSelector('#onestepcheckout-form', function() {
			this.fillSelectors('#onestepcheckout-form', {
		        'input[id="billing:firstname"]': 'stamba',
		        'input[id="billing:lastname"]': 'stambic',
		        'input[id="billing:telephone"]': '12344534',
		        'input[id="billing:postcode"]': 'E28EX',
		        'input[id="billing:city"]': 'London',
		        'input[id="billing:street1"]': 'Lambada is a good music'
		    }, false);
	    })
	    
	    switch(checkout_option){
		    
		    case "money":
		    
		    casper.waitForSelector("#p_method_checkmo", function() {
				this.fillSelectors('#onestepcheckout-form', {
			        'input[name="shipping_method"]': true,
			        '#p_method_checkmo': true,
			        'input[id="no_gift_message"]': true,
			        'input[id="agreement-1"]': true
			    }, true);
		    })
		    
		    console.log("payment method selected:"+checkout_option);
		    
		    break;
		    
		    case "sagepay":
		    
    	    casper.waitForSelector("#sagepaydirectpro_cc_type", function() {
				this.fillSelectors('#onestepcheckout-form', {
			        '#sagepaydirectpro_cc_owner': 'Fizipit o Moyazoci',
			        'select[id="sagepaydirectpro_cc_type"]': 'VISA',
			        'input[name="payment[cc_number]"]': '4929000000006',
			        'select[id="sagepaydirectpro_expiration"]': '11',
			        'select[id="sagepaydirectpro_expiration_yr"]': '2021',
			        '#sagepaydirectpro_cc_cid': '123',
			        'input[id="no_gift_message"]': true,
			        'input[id="agreement-1"]': true
			    }, true);
		    })
		    
		    console.log("payment method selected:"+checkout_option);
	    
		    break;
		    
		    default:
		    
		    console.log("payment method selected:"+checkout_option);
		    
	    }
		 
		this.test.pass('form populated');
	});
	
	casper.thenClick("#onestepcheckout-place-order", function(){
		casper.wait(1000, function(){
			casper.capture("screenshots/placingorder.png")
		})
	})
}

function order_user_guest(checkout_option){
		// Make a test order
	casper.then(function() {
		casper.capture('screenshots/amazon-search-2.png');
		casper.waitForSelector('#onestepcheckout-form', function() {
			this.fillSelectors('#onestepcheckout-form', {
		        'input[id="billing:firstname"]': 'stamba',
		        'input[id="billing:lastname"]': 'stambic',
 		        'input[id="billing:email"]': 'dsadassa@yahoo.com',
		        'input[id="billing:telephone"]': '12344534',
		        'input[id="billing:postcode"]': '432323',
		        'input[id="billing:city"]': 'London',
		        'input[id="billing:street1"]': 'Lambada is a good music'
		    }, false);
	    })
		 
	    switch(checkout_option){
		    
		    case "money":
		    
		     casper.waitForSelector("#p_method_checkmo", function() {
				this.fillSelectors('#onestepcheckout-form', {
			        '#p_method_checkmo': true,
			        'input[id="no_gift_message"]': true,
			        'input[id="agreement-1"]': true
			    }, true);
		    })
		    
		    break;
		    
		    case "sagepay":
		    
    	    casper.waitForSelector("#sagepaydirectpro_cc_type", function() {
				this.fillSelectors('#onestepcheckout-form', {
			        '#sagepaydirectpro_cc_owner': 'Fizipit o Moyazoci',
			        'select[id="sagepaydirectpro_cc_type"]': 'VISA',
			        'input[name="payment[cc_number]"]': '4929000000006',
			        'select[id="sagepaydirectpro_expiration"]': '11',
			        'select[id="sagepaydirectpro_expiration_yr"]': '2021',
			        '#sagepaydirectpro_cc_cid': '123',
			        'input[id="no_gift_message"]': true,
			        'input[id="agreement-1"]': true
			    }, true);
		    })
	    
		    break;
		    
	    }
		 
		this.test.pass('form populated');
	});
	
	casper.thenClick("#onestepcheckout-place-order", function(){
		casper.wait(1000, function(){
			casper.capture("screenshots/placingorder.png")
		})
	})
}

function success_page(){
	
	// Order is successful
	casper.then(function() {
		casper.wait(5000, function(){
			screenshots("success")
		    this.test.info('Current location is ' + this.getCurrentUrl());
			this.test.pass('On the success page now');
		})
	});
}

// Go to home
casper.test.comment('Go to home');

casper.start().viewport(1500,900).thenOpen(BASE_URL, function() {
	
    this.test.pass('Home was loaded');
    
    to_homepage();
    login_page();
    //register_page("me");
    //account_page();
    log_me_in(personal_email,my_password);
	category_page();
	add_product();
	cart_page();
	checkout_page();
	order_user_logged("money");
	success_page();
	
	//to do
	//more modules
	//cross device
	
});

casper.run(function() {
    this.test.done();
});