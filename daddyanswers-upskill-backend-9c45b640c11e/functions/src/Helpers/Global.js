exports.removeNull = obj => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
};

exports.checkArrayNulls = array => {
  return array.filter(function(el) {
    return el !== null && el !== "";
  });
};

exports.removeElement = (array, value) => {
  return array.filter(function(el) {
    return el != value;
  });
};
