(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];

    for (var i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
      this.addAsteroid();
    }
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach( function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach( function (asteroid) {
      asteroid.move();
    });
  };
})();
