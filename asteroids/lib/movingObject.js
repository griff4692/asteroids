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

  movingObject.DRAG = 0.99;

  movingObject.prototype.speed = function () {
    return Math.sqrt(this.vX * this.vX + this.vY * this.vY);
  };

  movingObject.prototype.draw = function (ctx) {
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'fff';
    ctx.stroke();

    if (this instanceof Asteroids.Bullet) {
      ctx.fillStyle = 'f00';
      ctx.fill();
    }
  };

  movingObject.prototype.move = function () {
    if (this instanceof Asteroids.Bullet) {
      this.x += this.vX;
      this.y += this.vY;
      return;
    }

    if (this instanceof Asteroids.Ship) {
      this.vX *= movingObject.DRAG;
      this.vY *= movingObject.DRAG;
    }

    var coords = Asteroids.Game.wrapPos(
      [this.x + this.vX, this.y + this.vY]
    );

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
