(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;
    this.started = false;
    this.points = 0;
    this.lives = Game.LIVES;
    this.level = 1;

    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship();
    this.resetAsteroids();
  };

  Game.BIG_ASTEROID_RADIUS = 20;
  Game.LIVES = 3;
  Game.DIM_X = 800;
  Game.DIM_Y = 500;

  Game.prototype.resetAsteroids = function () {
    for (var i = 0; i <= this.level; i += 1) {
      this.addAsteroid({
        radius: Game.BIG_ASTEROID_RADIUS,
        pos: Game.randomPos(),
        maxSpeed: 5
      });
    }
  };

  Game.prototype.endGame = function () {
    this.started = false;
    this.resetAsteroids();
    this.lives = Game.LIVES;
    this.draw();
  }

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
  };

  Game.prototype.renderNewGameText = function() {
    this.ctx.font = "36px serif";
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Press Spacebar to Start a New Game!", 150, 200);
  };


  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);

    if(asteroid.radius === Game.BIG_ASTEROID_RADIUS / 4) {
      this.points += 5;
      return;
    } else if (asteroid.radius === Game.BIG_ASTEROID_RADIUS / 2) {
      this.points += 3;
    } else {
      this.points += 1;
    }

    var speed = Math.sqrt(asteroid.vX * asteroid.vX +  asteroid.vY * asteroid.vY);

    var smallerOptions = {
      pos: [asteroid.x, asteroid.y],
      radius: asteroid.radius / 2,
      maxSpeed: speed * 1.2
    };

    for(var i = 0; i < 3; i++) {
      this.addAsteroid(smallerOptions);
    };

    this.points += 1;
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

    this.allObjects().forEach( function (obj) {
      obj.draw(that.ctx);
    });

    this.renderStats();

    if(! this.started) {
      this.renderNewGameText();
    }
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
    var pos = [
      this.ship.x - this.ship.radius * Math.cos(this.ship.direction),
      this.ship.y - this.ship.radius * Math.sin(this.ship.direction)
    ];

    var direction = this.ship.direction + Math.PI;

    this.bullets.push(new Asteroids.Bullet(pos, direction));
  };

  Game.outOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0);
  };

})();
