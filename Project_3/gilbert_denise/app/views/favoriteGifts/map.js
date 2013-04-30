function(doc) {
  if (doc.type === "favoriteGifts") {
    emit(doc.giftName, {
    "category": doc.category,
    "giftName": doc.giftName,
    "whereToBuy": doc.whereToBuy,
    "cost": doc.cost,
    "id": doc._id
    });
  }
};