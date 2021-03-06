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

})();
