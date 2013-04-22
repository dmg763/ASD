function(doc) {
  if (doc._id.substr(0, 10) === "recipients") {
    emit(doc._id, {
    "fname": doc.fname,
    "lname": doc.lname
    });
  }
};