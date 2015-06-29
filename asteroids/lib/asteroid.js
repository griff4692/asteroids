(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(posObj) {
    var asteroidVel = Asteroids.Util.randomVec(5); // Change later
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Asteroid);


})();
