(function () {

  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Util = window.Asteroids.Util = {};

  Util.inherits = function (parentClass, childClass) {
    var Surrogate = function () {};

    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    var dir = 2 * Math.PI * Math.random();
    var x = Math.cos(dir) * length;
    var y = Math.sin(dir) * length;

    return [x, y];
  };

  Util.randomFromTo = function (from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
  };

})();
