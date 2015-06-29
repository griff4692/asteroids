var sum = function() {
  var args = Array.prototype.slice.call(arguments);

  var total = 0;
  args.forEach( function (el) {
    total += el;
  });

  return total;
};

Function.prototype.myBind = function(context) {
  var args = Array.prototype.slice.call(arguments, 1);
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

// var catMeow = function () {
//   var innerArgs = Array.prototype.slice.call(arguments)
//   return fn.apply(c, ["meow"].concat(innerArgs));
// };

catMeow("anotherMeow");

var curriedSum = function (numArgs) {

  var numbers = [];

  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var total = 0;
      numbers.forEach(function (el) {
        total += el;
      })
      return total;
    } else {
      return _curriedSum;
    };
  };

  return _curriedSum;
};

curriedSum(2)(1)(1);

Function.prototype.curry = function (numArgs) {
  var fn = this;
  var args = [];

  var _curriedFunc = function (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn.apply(null, args);
    } else {
      return _curriedFunc;
    };
  };

  return _curriedFunc;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree.curry(3)(4)(20)(6); // == 30
