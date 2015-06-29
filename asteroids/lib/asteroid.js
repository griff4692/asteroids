(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(posObj) {
    Asteroids.movingObject.call(this, {
      pos: posObj.pos,
      vel: Asteroids.Util.randomVec(5),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR
    });
  };

  Asteroid.RADIUS = 5;
  Asteroid.COLOR = "#000000";

  Asteroids.Util.inherits(Asteroids.movingObject, Asteroid);

})();
