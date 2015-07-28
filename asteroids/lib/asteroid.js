(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(attrs) {
    Asteroids.movingObject.call(this, {
      pos: attrs.pos,
      radius: attrs.radius,
      vel: Asteroids.Util.randomVec(attrs.maxSpeed),
      color: Asteroid.COLOR
    });
  };

  Asteroid.RADIUS = 20;
  Asteroid.MIN_RADIUS = 5;

  Asteroid.COLOR = "#fff";

  Asteroids.Util.inherits(Asteroids.movingObject, Asteroid);

})();
