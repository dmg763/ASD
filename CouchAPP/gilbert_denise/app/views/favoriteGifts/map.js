function(doc) {
  if (doc.type === "favoriteGifts") {
    emit(doc.giftName, {
    "category": doc.category,
    "giftName": doc.giftName,
    "whereToBuy": doc.whereToBuy,
    "cost": doc.cost,
    "key": doc._id,
	"rev": doc._rev
    });
  }
};