(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var movingObject = Asteroids.movingObject = function(attrObj) {
    this.x = attrObj.pos[0];
    this.y = attrObj.pos[1];
    this.vX = attrObj.vel[0];
    this.vY = attrObj.vel[1];
    this.radius = attrObj.radius;
    this.color = attrObj.color;
  };

  movingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  movingObject.prototype.move = function () {
    if (this instanceof Asteroids.Bullet) {
      var coords = [this.x + this.vX, this.y + this.vY];
    } else {
      var coords = Asteroids.Game.wrapPos(
        [this.x + this.vX, this.y + this.vY]
      );
    }
    this.x = coords[0];
    this.y = coords[1];
  };

  movingObject.prototype.isCollidedWith = function (otherObj) {
    var dx = (this.x - otherObj.x);
    var dy = (this.y - otherObj.y);
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= (this.radius + otherObj.radius);
  };

})();
