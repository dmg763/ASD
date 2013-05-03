function(doc) {
  if (doc.type === "favoriteGifts") {
    emit(doc._id, {
    "category": doc.category,
    "giftName": doc.giftName,
    "whereToBuy": doc.whereToBuy,
    "cost": doc.cost,
    "key": doc._id,
	"rev": doc._rev
    });
  }
};