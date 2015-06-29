(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.ship = new Asteroids.Ship();

    for (var i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
      this.addAsteroid();
    }
  };

  Game.NUM_ASTEROIDS = 25;
  Game.DIM_X = 800;
  Game.DIM_Y = 500;

  Game.prototype.addAsteroid = function () {
    this.asteroids.push( new Asteroids.Asteroid({ pos: Game.randomPos() }));
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  }

  Game.randomPos = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.step = function (ctx) {
    this.draw(ctx);
    this.checkCollisions();
    this.moveObjects();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach( function (obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach( function (obj) {
      obj.move();
    });
  };

  Game.wrapPos = function (pos) {
    return [
      (pos[0] + Game.DIM_X) % Game.DIM_X,
      (pos[1] + Game.DIM_Y) % Game.DIM_Y
    ];
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i += 1) {
      var objOne = this.allObjects()[i];

      for (var j = i + 1; j < this.allObjects().length; j += 1) {
        var objTwo = this.allObjects()[j];

        if (objOne.isCollidedWith(objTwo)) {
          if (objTwo instanceof Asteroids.Ship) {
            objTwo.relocate();
          }
        }
      }
    }
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

})();
