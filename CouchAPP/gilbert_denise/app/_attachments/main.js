/* Denise M. Gilbert
ASD Term 1304
Project 3
April 25, 2013
main.js Page*/

// GLOBAL VARIABLES

var storeData;

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
		console.log("Saved item to storage with Key = " + recipientId);
		alert("Recipient Information is Saved!");

	};
});

$("#saveRecipientButton").on("click", storeData);

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

				$('#saveRecipientButton').on("click", function (key) {
					$('#saveRecipientButton').key = this.key;
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
                console.log("This is my Key: " + this.id);
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
		url:		'_view/recipients',
		type:		'GET',
		dataType:	'json',
		success:	function (data) {
			$.each(data.rows, function (index, value) {
				var lname = value.value.lname,
					fname = value.value.fname,
					address1 = value.value.address1,
					address2 = value.value.address2,
					city = value.value.city,
					state = value.value.state,
					zipCode = value.value.zipCode,
					bday = value.value.bday,
					sunSign = value.value.sunSign;
					
				$("#recipientList").append(
					$("<li>").append(
						$("<a>").attr("href", "#")
								.text(lname + ", " + fname)
					),
					$("<li>").append(
						$("<li>").text(address1 + ", " + address2)
					),
					$("<li>").append(
						$("<li>").text(city + ", " + state + "  " + zipCode)
					),
					$("<li>").append(
						$("<li>").text("Birthday:  " + bday)
					),
					$("<li>").append(
						$("<li>").text("Zodiac Sign:  " + sunSign)
					)
				);

			});
			
			$("#recipientList").listview("refresh");
			alert("Loading JSON Data");
		}
	});
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
			url:		'data.json',
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
		url:		'data.csv',
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

//////////////////////////////////////////////////////////// COUCH APP PAGES //////////////////////////////////////////////////////////////

// FAVORITE GIFTS PAGE

$(".favoriteGiftsButton").on('click', function () {
	$.couch.db("gilbert_denise").view("gilbert_denise/favoriteGifts", {
		success: function (data) {
			console.log(data);
			$("favoriteGiftList").empty();
			$.each(data.rows, function (index, value) {
				var docId = value.value.key;
				var docRev = value.value.rev;
				var item = (value.value || value.doc);
				$("#favoriteGiftList").append(
					$("<li>").append(
						$("<a>").attr("href", "gift.html?favoriteGifts=" + docId + "&docRev=" + docRev)
								.text(item.giftName)
					)
				);

			});
			$("#favoriteGiftList").listview("refresh");
		}
	});
});

// SAVE FAVORITE GIFT

$("#saveGiftButton").on('click', function () {
	var giftItem = {};
	giftItem.giftName = $("#giftName").val();
	giftItem.category = $("#category").val();
	giftItem.whereToBuy = $("#whereToBuy").val();
	giftItem.cost = $("#cost").val();
	giftItem.type = $("#type").val();
	$.couch.db("gilbert_denise").saveDoc(
		{
			giftName: giftItem.giftName,
			category: giftItem.category,
			whereToBuy: giftItem.whereToBuy,
			cost: giftItem.cost,
			type: giftItem.type
		},
		{
			success: function (data) {
				console.log(data);
				alert("Favorite Gift Item Saved!");
				$.mobile.changePage("#home");
			}
		});
});

// DISPLAY FAVORITE GIFT ITEM DETAILS

$(document).on('pageinit', '#giftDetails', function () {
	var urlVars = function () {
			var urlData = $(giftDetails).data("url");
			console.log(urlData);
			var urlParts = urlData.split('?');
			console.log(urlParts);
			var urlPairs = urlParts[1].split('&');
			console.log(urlPairs);
			var urlValues = {};
			for (var pair in urlPairs) {
				var keyValue = urlPairs[pair].split('=');
				console.log(keyValue);
				var key = decodeURIComponent(keyValue[0]);
				console.log(key);
				var value = decodeURIComponent(keyValue[1]);
				console.log(value);
				urlValues[key] = value;
				console.log(urlValues[key]);
			}
			return urlValues;	
		};
	var giftKey = urlVars().favoriteGifts;
	var giftRev = urlVars().docRev;
	$.couch.db("gilbert_denise").openDoc(giftKey, {
			success: function (data) {
						$('<section data-role="content">' +
						'<p>' + "<strong>&nbsp;&nbsp;Gift Name:  </strong>" + data.giftName + '</p>' +
						'<p>' + "<strong>&nbsp;&nbsp;Category:  </strong>" + data.category + '</p>' +
						'<p>' + "<strong>&nbsp;&nbsp;Where to Buy:  </strong>" + data.whereToBuy + '</p>' +
						'<p>' + "<strong>&nbsp;&nbsp;Cost:  </strong>$" + data.cost + '</p>' +
						'</section>').appendTo('#giftDetails');
					},
			error: function (status) {
								console.log(status);
							}
		});
					
// EDIT FAVORITE GIFT

	$("#editGiftItemButton").on("click", function () {
				$.mobile.changePage('editGift.html');
				$.couch.db("gilbert_denise").openDoc(giftKey, {
					success: function (data) {
						$('#editGiftName').val(data.giftName);
						$('#editCategory').val(data.category);
						$('#editWhereToBuy').val(data.whereToBuy);
						$('#editCost').val(data.cost);
						$('#editType').val(data.type);
					}
				});
				
			});

	$(document).on('pageinit', '#editGift', function () {
				$("#editGiftButton").on("click", function () {
					var doc = {
							_id: giftKey,
    						_rev: giftRev,
							giftName: editGiftName.value,
							category: editCategory.value,
							whereToBuy: editWhereToBuy.value,
							cost: editCost.value,
							type: editType.value
						};
					$.couch.db("gilbert_denise").saveDoc(doc, {
						success: function (data) {
							alert("Gift Changes Have Been Saved!");
							console.log(data);
							$.mobile.changePage("index.html");
						},
						error: function (status) {
							console.log(status);
						}
					});
					
				});
				
			});
					
// DELETE FAVORITE GIFT
					
	$("#deleteGiftItemButton").on("click", function () {
				var confirmDelete = confirm("Are you sure you want to DELETE this gift?");
				if (confirmDelete === true) {
					
					$.couch.db("gilbert_denise").removeDoc({
						_id: giftKey,
						_rev: giftRev
					}, {
						success: function (data) {
							alert("Gift has been DELETED!");
							$.mobile.changePage("index.html");
						},
						error: function (status) {
							console.log(status);
						}
					});
				} else {
					alert("Gift was NOT deleted!");
					$.mobile.changePage("index.html");
				}
			});
});