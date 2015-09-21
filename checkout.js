exports.go_to_checkout = function(){
	casper.thenClick('.checkout-types > li:nth-child(1) > button:nth-child(1)', function() {
		this.test.assertTextExists('Billing address');
	    this.test.info('Current location is ' + this.getCurrentUrl());
		this.test.pass('Checkout page loaded ok');
		screenshots("checkout")
	});
}

exports.order_user_guest = function(checkout_option){

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

exports.order_user_logged = function(checkout_option){
	
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
