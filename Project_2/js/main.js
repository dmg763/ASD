/* Denise M. Gilbert
ASD Term 1304
Project 2
April 18, 2013
main.js Page*/

// GLOBAL VARIABLES

var $,
	storeData;

// HOME PAGE

$('#home').on('pageinit', function () {
	$('#home').css({
		backgroundColor: "#581E59"
	});
});

// ADD RECIPIENT PAGE

$('#addRecipient').on('pageinit', function () {

	var myForm = $('#addRecipientForm'),
		addRecipientErrorsLink = $('#addRecipientErrorsLink');

	myForm.validate({
		invalidHandler: function (form, validator) {
			addRecipientErrorsLink.click();
			console.log(validator.submitted);
			var html = '';
			for (var key in validator.submitted) {
				var label = $('label[for^="' + key + '"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-input-text-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldName + '</li>';
			}
			$('#addRecipientErrors ul').html(html);
		},
		submitHandler: function () {
			var data = myForm.serializeArray();
			storeData(this.key);
		}
	});

// SAVE TO LOCAL STORAGE

	var storeData = function (key) {
	
		var recipientId,
			recipient;
	
		if (!key) {
			recipientId = Math.floor(Math.random() * 100001);
	
		} else {
			recipientId = key;
		}
	
		recipient = {};
	
		recipient.fname = ["First Name:", $("#fname").val()];
		recipient.lname = ["Last Name:", $("#lname").val()];
		recipient.address1 = ["Address1:", $("#address1").val()];
		recipient.address2 = ["Address2:", $("#address2").val()];
		recipient.city = ["City:", $("#city").val()];
		recipient.state = ["State:", $("#state").val()];
		recipient.zipCode = ["Zip Code:", $("#zipCode").val()];
		recipient.bday = ["Birthday:", $("#bday").val()];
		recipient.sunSign = ["Zodiac Sign:", $("#sunSign").val()];
		recipient.clothing = ["Clothing Sizes:", $("#clothing").val()];
		recipient.footwear = ["Footwear Sizes:", $("#footwear").val()];
		recipient.jewelry = ["Jewelry Sizes:", $("#jewelry").val()];
		recipient.colors = ["Favorite Color(s):", $("#colors").val()];
		recipient.flowers = ["Favorite Flower(s):", $("#flowers").val()];
		recipient.foods = ["Favorite Food(s):", $("#foods").val()];
		recipient.restaurants = ["Favorite Restaurant(s):", $("#restaurants").val()];
	
		// Use Stringify to Convert the Recipient Object to a String
		localStorage.setItem(recipientId, JSON.stringify(recipient));
		console.log("Saved item to storage with recipientId = " + recipientId);
		alert("Recipient Information is Saved!");

	};
});

$("#saveRecipientButton").on("click", storeData);




