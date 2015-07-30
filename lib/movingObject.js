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
    this.direction = attrObj.direction;
  };

  movingObject.DRAG = 0.99;

  movingObject.prototype.speed = function () {
    return Math.sqrt(this.vX * this.vX + this.vY * this.vY);
  };

  movingObject.prototype.move = function () {
    if (this instanceof Asteroids.Bullet) {
      this.x += this.vX;
      this.y += this.vY;
      return;
    }

    if(this instanceof Asteroids.Particle) {
      this.x += Asteroids.Util.randomFromTo(-5, 5);
      this.y += Asteroids.Util.randomFromTo(-5, 5);
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

  movingObject.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction - Math.PI / 2);
    ctx.drawImage(this.sprite, 0, 0, this.radius * 2, this.radius * 2, - this.radius, - this.radius, this.radius * 2, this.radius * 2);
    ctx.restore();
  };

  movingObject.prototype.isCollidedWith = function (otherObj) {
    var dx = (this.x - otherObj.x);
    var dy = (this.y - otherObj.y);
    var dist = Math.sqrt(dx * dx + dy * dy);
    return dist <= (this.radius + otherObj.radius);
  };

})();
