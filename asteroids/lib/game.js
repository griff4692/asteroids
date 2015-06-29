(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
  };

  Game.NUM_ASTEROIDS = 3;
  Game.DIM_X = 300;
  Game.DIM_Y = 300;

  Game.prototype.addAsteroid = function () {
    this.asteroids.push( new Asteroids.Asteroid({ pos: Game.randomPos() }));
  }

  Game.randomPos = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    this.asteroids.forEach( function (asteroid) {
      asteroid.draw(ctx);
    });
  };
})();
