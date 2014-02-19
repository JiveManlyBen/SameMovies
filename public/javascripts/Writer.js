function Writer(data) {
  var array = data.split(" (");
  this.Name = array[0];
  this.types = typeof array[1] === 'undefined' ? [] : [array[1].substring(0, array[1].length - 1)];
}

Writer.prototype.merge = function(writer) {
  if (this.Name === writer.Name) {
    for (var i = 0, len = writer.types.length; i < len; i++) {
      this.types.push(writer.types[i]);
    }
    return true;
  }
  else {
    return false;
  }
};

Writer.prototype.getDisplayName = function() {
  var name =  String(this.Name);
  var types = "";
  this.types.forEach(function(value, index, array) {
    types = types + (index === 0 ? " (" : ", ") + value;
    if (index === array.length - 1) {
      types = types + ")";
    }
  });
 
  return name + types;
};

Writer.prototype.namesEqual = function(writer) {
  return this.Name === writer.Name;
};
