(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (ctx, background) {
    this.ctx = ctx;
    this.background = background;
    this.started = false;
    this.points = 0;
    this.lives = Game.LIVES;
    this.level = 1;

    this.background = new Image();
    this.background.src = 'images/background.jpg';
    var that = this;

    this.background.onload = function () {
      ctx.drawImage(that.background, 0, 0);
      that.renderNewGameText();
      that.renderStats();
    }

    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship();
    this.resetAsteroids();
  };

  // constants
  Game.BIG_ASTEROID_RADIUS = 20;
  Game.BIG_ASTEROID_LEVEL_ONE_MAX_SPEED = 1;
  Game.BIG_ASTEROID_POINTS = 5;
  Game.MID_ASTEROID_POINTS = 10;
  Game.SMALL_ASTEROID_POINTS = 25;
  Game.LEVEL_ONE_SPAWN_BASE = 1;
  Game.SPEED_INCR = 1.05;
  Game.EXTRA_LIFE = 100;
  Game.LIVES = 3;
  Game.DIM_X = 800;
  Game.DIM_Y = 500;

  Game.prototype.resetAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i <= this.level; i += 1) {
      this.addAsteroid({
        radius: Game.BIG_ASTEROID_RADIUS,
        pos: Game.randomPos(),
        maxSpeed: Game.BIG_ASTEROID_LEVEL_ONE_MAX_SPEED + (this.level / 5)
      });
    };
  };

  Game.prototype.endGame = function () {
    this.started = false;
    this.bullets = [];
    this.ship.relocate();
    this.resetAsteroids();
    this.draw();
    this.lives = Game.LIVES;
    this.level = 1;
    this.points = 0;
  };

  Game.prototype.nextLevel = function () {
    this.level += 1;
    this.bullets = [];
    this.ship.relocate();
    this.resetAsteroids();
    this.draw();
  };

  Game.prototype.isWon = function () {
    return this.asteroids.length === 0;
  };

  Game.prototype.addAsteroid = function (options) {
    this.asteroids.push(
      new Asteroids.Asteroid({
        pos: options.pos,
        radius: options.radius,
        maxSpeed: options.maxSpeed
      })
    );
  };

  Game.prototype.renderStats = function() {
    this.ctx.font = "24px serif";
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Point total: " + this.points, 10, 40);
    this.ctx.fillText("Lives: " + this.lives, 10, 80);
    this.ctx.fillText("Level: " + this.level, 10, 120);
  };

  Game.prototype.renderNewGameText = function() {
    this.ctx.font = "36px serif";
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Press Spacebar to Start a New Game!", 150, 200);
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);

    var oldPoints = this.points;

    if(asteroid.radius === Game.BIG_ASTEROID_RADIUS / 4) {
      this.points += Game.SMALL_ASTEROID_POINTS;
      return;
    } else if (asteroid.radius === Game.BIG_ASTEROID_RADIUS / 2) {
      this.points += Game.MID_ASTEROID_POINTS;
    } else {
      this.points += Game.BIG_ASTEROID_POINTS;
    }

    if(this.points % Game.EXTRA_LIFE < oldPoints % Game.EXTRA_LIFE) {
      this.lives += 1;
    }

    var smallerOptions = {
      pos: [asteroid.x, asteroid.y],
      radius: asteroid.radius / 2,
      maxSpeed: asteroid.speed() * Game.SPEED_INCR
    };

    for(var i = 0; i < Game.LEVEL_ONE_SPAWN_BASE + this.level; i++) {
      this.addAsteroid(smallerOptions);
    };
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

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

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var that = this;

    this.ctx.drawImage(that.background, 0, 0);

    this.renderStats();
    if(! this.started) {
      this.renderNewGameText();
    };

    this.allObjects().forEach(function (obj) {
      obj.draw(that.ctx);
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
        game.ship.relocate();
        game.lives -= 1;
        if(game.lives === 0) {
          game.over = true;
        }
      }
    });

    this.asteroids.forEach(function (asteroid) {
      game.bullets.forEach(function (bullet) {
        if (bullet.isCollidedWith(asteroid)) {
          game.removeAsteroid(asteroid);
          game.removeBullet(bullet);
        }
      });
    });
  };

  Game.prototype.removeBullet = function (bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  };

  Game.prototype.cleanUpBullets = function () {
    var game = this;

    this.bullets.forEach(function (bullet) {
      if (Game.outOfBounds([bullet.x, bullet.y])) {
        game.removeBullet(bullet);
      }
    });
  };

  Game.prototype.shoot = function () {
    var radialPos = [
      this.ship.radius * Math.cos(this.ship.direction),
      this.ship.radius * Math.sin(this.ship.direction)
    ]

    var pos = [
      this.ship.x - radialPos[0],
      this.ship.y - radialPos[1]
    ];

    var bulletDirection = this.ship.direction + Math.PI;
    this.bullets.push(new Asteroids.Bullet(pos, bulletDirection));

    // recoil slightly
    this.ship.x +=  radialPos[0] / 2;
    this.ship.y += radialPos[1] / 2;
  };

  Game.outOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0);
  };

})();
