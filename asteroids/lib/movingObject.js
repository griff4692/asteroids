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
    this.x += this.vX;
    this.y += this.vY;
  };

})();
