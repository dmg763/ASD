function(doc) {
  if (doc.type === "favoriteGifts") {
    emit(doc._id, {
    "category": doc.category,
    "giftName": doc.giftName,
    "whereToBuy": doc.whereToBuy,
    "cost": doc.cost,
    "id": doc._id
    });
  }
};