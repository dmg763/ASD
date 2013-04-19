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

// DISPLAY LOCAL STORAGE

var displayData = function () {

	if (localStorage.length !== 0) {
		alert("Loading Local Storage");
		
		$.mobile.changePage("#showAll");
		
		for (var i = 0, j = localStorage.length; i < j ; i += 1) {
			var key = localStorage.key(i),
		recipient = JSON.parse(localStorage.getItem(key)),
		makeSubList = $("<li></li>"),
		makeParagraph = $("<p></p>"),
		makeEditButton = $("<a></a>").attr({
				"href": "#addRecipient",
				"id": "editButton",
				"data-role": "button",
				"data-theme": "b",
				"data-ajax": "false",
				"data-inline": "true",
				"data-key": key
			})
			.html("Edit Record")
			.appendTo(makeParagraph),
		makeDeleteButton = $("<a></a>").attr({
				"href": "#",
				"id": "deleteButton",
				"data-ajax": "false",
				"data-inline": "true",
				"data-key": key
			})
			.html("Delete Record")
			.appendTo(makeParagraph),
		makeSubLi = ('<section data-role="collapsible" data-inset="false" data-mini="false" data-collapsed-icon="arrow-d"> <h2>' + recipient.lname[1] + ", " + recipient.fname[1] + "</h2>" + 
					 "<li>" + "<table>" + "<tr>" +
					 "<td>" + "Address 1:" + "</td>" +
					 "<td>" + recipient.address1[1] + "</td>" + "</tr>" +
					 "<td>" + "Address 2:" + "</td>" +
					 "<td>" + recipient.address2[1]  + "</td>" + "</tr>" +
					 "<td>" + "City:" + "</td>" +
					 "<td>" + recipient.city[1]  + "</td>" + "</tr>" +
					 "<td>" + "State:" + "</td>" +
					 "<td>" + recipient.state[1]  + "</td>" + "</tr>" +
					 "<td>" + "Zip Code:" + "</td>" +
					 "<td>" + recipient.zipCode[1]  + "</td>" + "</tr>" +
					 "<td>" + "Birthday:" + "</td>" +
					 "<td>" + recipient.bday[1]  + "</td>" + "</tr>" +
					 "<td>" + "Zodiac Sign:" + "</td>" +
					 "<td>" + recipient.sunSign[1]  + "</td>" + "</tr>" +
					 "<td>" + "Clothing Sizes:" + "</td>" +
					 "<td>" + recipient.clothing[1]  + "</td>" + "</tr>" +
					 "<td>" + "Shoe Size:" + "</td>" +
					 "<td>" + recipient.footwear[1]  + "</td>" + "</tr>" +
					 "<td>" + "Ring Size:" + "</td>" +
					 "<td>" + recipient.jewelry[1]  + "</td>" + "</tr>" +
					 "<td>" + "Favorite Color(s):" + "</td>" +
					 "<td>" + recipient.colors[1]  + "</td>" + "</tr>" +
					 "<td>" + "Favorite Flower(s):" + "</td>" +
					 "<td>" + recipient.flowers[1]  + "</td>" + "</tr>" +
					 "<td>" + "Favorite Food(s):" + "</td>" +
					 "<td>" + recipient.foods[1]  + "</td>" + "</tr>" +
					 "<td>" + "Favorite Restaurant(s):" + "</td>" +
					 "<td>" + recipient.restaurants[1]  + "</td>" + "</tr>" +
					 "<td>" + "Wish List Item(s):" + "</td>"),
		makeLink = $("<a href='#' id=tableLinks'" + key + "'>Edit</a>");
			makeLink.on('click', function () {
                console.log("This is my key: " + this.id);
            });
			makeLink.html(makeSubLi);
			makeSubList.append(makeLink).appendTo("#showAll");
			makeEditButton.appendTo("#showAll");
			$("#editButton").on("click", editRecord);
			makeDeleteButton.appendTo("#showAll");
			$("#deleteButton").on("click", deleteRecord);

		}
			
	}
};

// EDIT RECORD

var editRecord =  function (key) {
				var value = localStorage.getItem($(this).data('key')),
			item = $.parseJSON(value);
				$('#fname').val(item.fname[1]);
				$('#lname').val(item.lname[1]);
				$('#address1').val(item.address1[1]);
				$('#address2').val(item.address2[1]);
				$('#city').val(item.city[1]);
				$('#state').val(item.state[1]);
				$('#zipCode').val(item.zipCode[1]);
				$('#bday').val(item.bday[1]);
				$('#sunSign').val(item.sunSign[1]);
				$('#clothing').val(item.clothing[1]);
				$('#footwear').val(item.footwear[1]);
				$('#jewelry').val(item.jewelry[1]);
				$('#colors').val(item.colors[1]);
				$('#flowers').val(item.flowers[1]);
				$('#foods').val(item.foods[1]);
				$('#restaurants').val(item.restaurants[1]);
			
				$('#saveRecipientButton').val("Edit Recipient");
				
				$("#saveRecipientButton").off();
	
				$('#saveRecipientButton').on("click", function () {
					$("#saveRecipientButton").key = this.key;
					alert("Recipient Changes Saved!");
					$.mobile.changePage("#home");
					return false;
				});
			};

// DELETE RECORD

var deleteRecord =  function (key) {
				var confirmDelete = confirm("Are you sure you want to DELETE this recipient?");
				if (confirmDelete === true) {
					localStorage.removeItem($(this).data('key'));
					alert("Recipient Record Deleted");
					$.mobile.changePage("#home");
					return false;
	
				} else {
					alert("Recipient was NOT deleted!");
				}
			};

// CLEAR LOCAL STORAGE
	
$('#deleteAllButton').on("click", function () {
		var confirmDelete = confirm("WARNING! You Are About to DELETE ALL Gift Recipient Records.");
		if (localStorage.length === 0) {
		    alert("There Are No Records to Delete.");
	    } else if (confirmDelete) {
		    localStorage.clear();
		    alert("All Gift Recipient Records Have Been Deleted.");
		    $.mobile.changePage("#home");
			return false;
	    }
	});

// SHOW JSON DUMMY DATA

$('#jsonButton').on("click", function () {

		$.ajax({
			url:		'xhr/data2.json',
			type:		'GET',
			dataType:	'json',
			success:	function (response) {
				for (var i in response.recipients) {
					var recipients = response.recipients[i];

					$('<ul data-role="listview">' + 
						'<li>' +
						'<p><strong>' + recipients.lName + ', ' + recipients.fName + '</strong></p>' +
						'<p>' + "Birthday: " + recipients.bDay + '</p>' +
						'<p>' + "Top Size: " + recipients.topSize + '</p>' +
						'<p>' + "Bottom Size: " + recipients.bottomSize + '</p>' +
						'<p>' + "Shoe Size: " + recipients.shoeSize + '</p>' +
						'<p>' + "Ring Size: " + recipients.ringSize + '</p>' +
						'<p>' + "Favorite Color: " + recipients.fColor + '</p>' + 
						'</li>' + '</ul>').appendTo('#jsonPage');
				}
			}

		});
		alert("Loading JSON Data");

	});

//  SHOW CSV DUMMY DATA

$('#csvButton').on("click", function () {

	$.ajax({
		url:		'xhr/data2.csv',
		type:		'GET',
		dataType:	'text',
		success:	function (response) {
			var csv = response.split(/\r\n|\n/),
				formatCSV = csv[0].split('|'),
				type = [];
			for (var i = 1; i < csv.length; i += 1) {
				var data = csv[i].split('|');
				if (data.length === formatCSV.length) {
					var recipients = [];
					for (var j = 0; j < formatCSV.length; j += 1) {
						recipients.push(data[j]);
					}
					type.push(recipients);
				}
			}
			for (var k = 0; k < type.length; k += 1) {
				var recipient = type[k];	

				$('<div data-role="content">' + '<ul data-role="listview">' + 
						'<li>' +
						'<p><strong>' + recipient[0] + ', ' + recipient[1] + '</strong></p>' +
						'<p>' + "Birthday: " + recipient[2] + '</p>' +
						'<p>' + "Top Size: " + recipient[3] + '</p>' +
						'<p>' + "Bottom Size: " + recipient[4] + '</p>' +
						'<p>' + "Shoe Size: " + recipient[5] + '</p>' +
						'<p>' + "Ring Size: " + recipient[6] + '</p>' +
						'<p>' + "Favorite Color: " + recipient[7] + '</p>' + 
						'</li>' + '</ul>' + '</div>').appendTo('#csv');
			}
		}

	});
	alert("Loading CSV Data");
});


// SHOW ALL PAGE

$(".showAllButton").on("click", function () {

	if (localStorage.length === 0) {
		$.mobile.changePage("#jsonAlert");
	} else {
		displayData();
	}
	
});

// DISPLAY REMINDERS PAGE (data.json)

$('.jsonLink').on("click", function () {

		$.ajax({
			url:		'xhr/data.json',
			type:		'GET',
			dataType:	'json',
			success:	function (response) {
				for (var i in response.recipients) {
					var recipients = response.recipients[i];

					$('<section data-role="content">' +
					  '<ul data-role="listview">' +
					  '<li data-role="list-divider">' + recipients.giftDate + '<span class="ui-li-count">1</span>' +
					  '<li <a href="index.html">' + 
							'<img src="' + recipients.image + '" class="listviewImages">' +
							'<p class="giftType">' + recipients.giftType + '</p>' +
							'<h1>' + recipients.fName + ' ' + recipients.lName + '</h1>' +
						'</a>' + '</li>' + '</li>' + '</li>' + '</ul>' + '</section>').appendTo('#remindersPage');
				}
			}
		});
		alert("You Have New Reminders");
	});

// DISPLAY ZODIAC SIGNS PAGE (data.csv)

$('.zodiacSignsButton').on("click", function () {

	$.ajax({
		url:		'xhr/data.csv',
		type:		'GET',
		dataType:	'text',
		success:	function (response) {
			var csv = response.split(/\r\n|\n/),
				formatCSV = csv[0].split('|'),
				type = [];
			for (var i = 1; i < csv.length; i += 1) {
				var data = csv[i].split('|');
				if (data.length === formatCSV.length) {
					var recipients = [];
					for (var j = 0; j < formatCSV.length; j += 1) {
						recipients.push(data[j]);
					}
					type.push(recipients);
				}
			}
			for (var k = 0; k < type.length; k += 1) {
				var recipient = type[k];	

				$('<section data-role="content">' + '<ul data-role="listview">' + 
						'<li>' +
						'<a class="listviewLinks">' +
						'<h3>' + recipient[0] + '</h3>' +
						'<h4>' + recipient[1] + '</h4>' +
						'<img src="' + recipient[2] + '" class="listviewImages">' +
						'</a>' + '</li>' + '</ul>' + '</section>').appendTo('#zodiacSignsPage');
			}
		}

	});
	alert("Loading Zodiac Signs Info");
});


