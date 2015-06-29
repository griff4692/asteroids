(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship();

    for (var i = 0; i < Game.NUM_ASTEROIDS; i += 1) {
      this.addAsteroid();
    }
  };

  Game.NUM_ASTEROIDS = 5;
  Game.DIM_X = 800;
  Game.DIM_Y = 500;

  Game.prototype.addAsteroid = function () {
    this.asteroids.push( new Asteroids.Asteroid({ pos: Game.randomPos() }));
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  }

  Game.randomPos = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.step = function (ctx) {
    this.cleanUpBullets();
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
    var game = this;

    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(game.ship)) {
        console.log("ship hit")
        game.ship.relocate();
      }
    });


    this.asteroids.forEach(function (asteroid) {
      game.bullets.forEach(function (bullet) {
        if (bullet.isCollidedWith(asteroid)) {
          console.log("asteroid hit")
          game.removeAsteroid(asteroid);
          game.removeBullet(bullet);
        }
      });
    });
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.cleanUpBullets = function () {

    game = this;

    this.bullets.forEach(function (bullet) {

      if (Game.outOfBounds([bullet.x, bullet.y])) {
        game.removeBullet(bullet);
      }
    });
  };

  Game.prototype.shoot = function () {
    var pos = [this.ship.x, this.ship.y];
    var direction = this.ship.direction;
    this.bullets.push(new Asteroids.Bullet(pos, direction));
  };

  Game.outOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0);
  };

})();
