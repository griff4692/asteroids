(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, direction) {
    Asteroids.movingObject.call(this, {
      pos: pos,
      vel: [Math.cos(direction) * Bullet.SPEED, Math.sin(direction) * Bullet.SPEED],
      radius: Bullet.RADIUS,
      color: Bullet.COLOR
    });
  };

  Bullet.RADIUS = 3;
  Bullet.COLOR = "#ff0000";
  Bullet.SPEED = 10;

  Asteroids.Util.inherits(Asteroids.movingObject, Bullet);

})();
