(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Particle = Asteroids.Particle = function (attrs) {
    Asteroids.movingObject.call(this, {
      pos: attrs.pos,
      radius: attrs.radius,
      vel: [0, 0],
      direction: 0
    });
    this.sprite = new Image();
    this.sprite.src = "http://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png";
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Particle);

  Particle.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.drawImage(this.sprite, 0, 0, this.radius * 2, this.radius * 2);
    ctx.restore();
  };

  Particle.prototype.move = function () {
    this.x += Asteroids.Util.randomFromTo(-1, 1);
    this.y += Asteroids.Util.randomFromTo(-1, 1);
  };

})();
