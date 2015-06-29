(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  };

  Asteroids.MovingObject = function(attrObj) {
    this.x = attrObj.pos[0];
    this.y = attrObj.pos[1];
    this.vX = attrObj.vel[0];
    this.vY = attrObj.vel[1];
    this.radius = attrObj.radius;
    this.color = attrObj.color;
  };


})();
