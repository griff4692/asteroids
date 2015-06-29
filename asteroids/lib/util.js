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

})();
