(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function () {
    Asteroids.movingObject.call(this, {
      pos: Asteroids.Game.randomPos(Ship.RADIUS),
      vel: [0, 0],
      radius: Ship.RADIUS,
      direction: Math.PI / 2
    });
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Ship);

  Ship.RADIUS = 25;
  Ship.MAX_SPEED = 5;
  Ship.sprite = new Image();
  Ship.sprite.src = './images/ship.jpg';

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction - Math.PI / 2);
    ctx.drawImage(Ship.sprite, 0, 0, 394, 350, -this.radius, -this.radius, this.radius * 2, this.radius * 2);

    ctx.restore();

    this.redrawParticles(ctx);
  };

  Ship.prototype.radialPos = function () {
    return [
      this.radius * Math.cos(this.direction),
      this.radius * Math.sin(this.direction)
    ]
  };

  Ship.prototype.redrawParticles = function (ctx) {
    var baseX, baseY;

    for(var i = 0; i < this.speed() * 10; i++) {
      var particle = new Asteroids.Particle
        ({
          pos: this.generateParticlePos(),
          direction: this.direction + Math.PI,
          radius: 5,
          vel: [this.vX, this.vY]
        })
      particle.draw(ctx);
    };
  };

  Ship.prototype.generateParticlePos = function () {
    return [
      this.x + Asteroids.Util.randomFromTo(-5, 5) + (this.radialPos()[0] * (Math.random() + 1)),
      this.y + Asteroids.Util.randomFromTo(-5, 5) + (this.radialPos()[1] * (Math.random() + 1))
    ]
  }

  Ship.prototype.relocate = function () {
    var coords = Asteroids.Game.randomPos(this.radius);
    this.x = coords[0];
    this.y = coords[1];
    this.vX = 0;
    this.vY = 0;
  };

  Ship.prototype.power = function (impulse) {
    if(this.speed() > Ship.MAX_SPEED) {
      this.vX *= Ship.MAX_SPEED / this.speed();
      this.vY *= Ship.MAX_SPEED / this.speed();
    }

    this.vX -= impulse * Math.cos(this.direction);
    this.vY -= impulse * Math.sin(this.direction);
  };

  Ship.prototype.rotate = function(radians) {
      this.direction = (this.direction + radians) % (Math.PI * 2);
      if (this.direction < 0) {
        this.direction += Math.PI * 2;
      };
  };
})();
