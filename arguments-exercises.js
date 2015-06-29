var sum = function() {
  args = Array.prototype.slice.call(arguments);

  var total = 0;
  args.forEach( function (el) {
    total += el;
  });

  return total;
};

Function.prototype.myBind = function(context) {
  args = Array.prototype.slice.call(arguments, 1);
  var fn = this;

  return function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    return fn.apply(context, args.concat(innerArgs));
  };
};

var Cat = function (name) {
  this.name = name;
};

var meow = function (meow, anotherMeow) {
  console.log("My name is " + this.name);
  console.log(meow);
  console.log(anotherMeow);
};

var c = new Cat("whiskers");
var catMeow = meow.myBind(c, "meow");

var catMeow = function () {
  var innerArgs = Array.prototype.slice.call(arguments)
  return fn.apply(context, ["meow].concat(innerArgs));
};

catMeow("anotherMeow");
