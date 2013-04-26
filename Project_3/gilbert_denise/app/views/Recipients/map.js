function(doc) {
  if (doc.type === "recipient") {
    emit(doc.lname, {
    "lname": doc.lname,
    "fname": doc.fname,
    "address1": doc.address1,
    "address2": doc.address2,
    "city": doc.city,
    "state": doc.state,
    "zipCode": doc.zipCode,
    "bday": doc.bday,
    "sunSign": doc.sunSign,
    "clothing": doc.clothing,
    "footwear": doc.footwear,
    "jewelry": doc.jewelry,
    "colors": doc.colors,
    "flowers": doc.flowers,
    "foods": doc.foods,
    "restaurants": doc.restaurants,
    "wishList1": doc.wishList1,
    "wishList2": doc.wishList2,
    "wishList3": doc.wishList3,
    "wishList4": doc.wishList4,
    "wishList5": doc.wishList5
    });
  }
};