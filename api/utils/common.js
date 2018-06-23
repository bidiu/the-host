function compressDoc(doc) {
  for (let [k, v] of Object.entries(doc)) {
    if (typeof v === 'undefined') {
      delete doc[k];
    }
  }
  return doc;
}

exports.compressDoc = compressDoc;
