(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(attrs) {
    Asteroids.movingObject.call(this, {
      pos: attrs.pos,
      radius: attrs.radius,
      vel: Asteroids.Util.randomVec(attrs.maxSpeed),
      direction: attrs.direction
    });

    this.sprite = new Image();

    if (this.radius === Asteroids.Game.BIG_ASTEROID_RADIUS) {
      this.sprite.src = './images/asteroid_big.jpg';
    } else if (this.radius === Asteroids.Game.BIG_ASTEROID_RADIUS / 2) {
      this.sprite.src = './images/asteroid_medium.jpg';
    } else {
      this.sprite.src = './images/asteroid_small.jpg';
    }

    setInterval(function () {
      this.direction += Math.PI / 1000
    }.bind(this), Asteroids.GameView.TIME_STEP)
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Asteroid);


  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction - Math.PI / 2);
    ctx.drawImage(this.sprite, 0, 0, this.radius * 2, this.radius * 2, - this.radius, - this.radius, this.radius * 2, this.radius * 2);
    ctx.restore();
  };

})();
