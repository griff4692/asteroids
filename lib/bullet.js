(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, direction) {
    Asteroids.movingObject.call(this, {
      pos: pos,
      vel: [
        Math.cos(direction) * Bullet.SPEED,
        Math.sin(direction) * Bullet.SPEED
      ],
      radius: Bullet.RADIUS,
      direction: direction
    });

    this.color = Bullet.COLOR;
  };

  Bullet.RADIUS = 4;
  Bullet.COLOR = "#f00";
  Bullet.SPEED = 5;

  Asteroids.Util.inherits(Asteroids.movingObject, Bullet);

  Bullet.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fillStyle = this.color;
    ctx.fill();
  };

})();
