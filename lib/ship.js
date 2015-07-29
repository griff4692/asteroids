(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function () {
    Asteroids.movingObject.call(this, {
      pos: Asteroids.Game.randomPos(),
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    });

    this.direction = Math.PI / 2;
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Ship);

  Ship.RADIUS = 25;
  Ship.COLOR = "#fff";
  Ship.MAX_SPEED = 5;

  Ship.prototype.relocate = function () {
    var coords = Asteroids.Game.randomPos();
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

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      this.direction - Math.PI / 2,
      this.direction + Math.PI / 2,
      false
    );

    ctx.moveTo(
      this.x - Ship.RADIUS * Math.cos(this.direction),
      this.y - Ship.RADIUS * Math.sin(this.direction)
    );

    ctx.lineTo(
      this.x - Ship.RADIUS * Math.cos(this.direction - Math.PI / 2),
      this.y - Ship.RADIUS * Math.sin(this.direction - Math.PI / 2)
    );

    ctx.moveTo(
      this.x - Ship.RADIUS * Math.cos(this.direction),
      this.y - Ship.RADIUS * Math.sin(this.direction)
    );

    ctx.lineTo(
      this.x - Ship.RADIUS * Math.cos(this.direction + Math.PI / 2),
      this.y - Ship.RADIUS * Math.sin(this.direction + Math.PI / 2)
    );

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  };

  Ship.prototype.rotate = function(degrees) {
    this.direction += degrees;
  };
})();
