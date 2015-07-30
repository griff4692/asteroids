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
  Game.BIG_ASTEROID_RADIUS = 40;
  Game.BIG_ASTEROID_LEVEL_ONE_MAX_SPEED = 0.25;
  Game.BIG_ASTEROID_POINTS = 5;
  Game.MID_ASTEROID_POINTS = 10;
  Game.SMALL_ASTEROID_POINTS = 25;
  Game.SPEED_INCR = 1.1;
  Game.EXTRA_LIFE = 100;
  Game.LIVES = 3;
  Game.DIM_X = 800;
  Game.DIM_Y = 500;

  Game.prototype.resetAsteroids = function () {
    this.asteroids = [];
    for (var i = 0; i <= this.level; i += 1) {
      this.addAsteroid({
        radius: Game.BIG_ASTEROID_RADIUS,
        pos: Game.randomPos(Game.BIG_ASTEROID_RADIUS),
        maxSpeed: Game.BIG_ASTEROID_LEVEL_ONE_MAX_SPEED + (this.level / 5),
        direction: Math.random() * Math.PI * 2
      });
    };
  };

  Game.prototype.endGame = function () {
    this.started = false;
    this.bullets = [];
    this.ship.relocate();
    this.resetAsteroids();
    this.draw();
    this.level = 1;
    this.points = 0;
    this.lives = Game.LIVES;
  };

  Game.prototype.nextLevel = function () {
    this.level += 1;
    this.bullets = [];
    this.ship.relocate();
    this.resetAsteroids();
    this.draw();
    this.drawNewLevelSign();
  };

  Game.prototype.drawNewLevelSign = function () {
    var tempParticles = [];

    for(var i = 0; i < 400; i ++) {
      tempParticles.push(new Asteroids.Particle
      ({
        pos: Game.randomPos(150),
        radius: 20,
        direction: Math.random() * Math.PI * 2,
        vel: [0, 0]
      }));
    };

    var that = this;

    Game.Transition = setInterval(function () {
      tempParticles.forEach(function (particle) {
        particle.draw(that.ctx);
        that.drawNextLevelWord();
        particle.move();
      })
    }, 10)
  };

  Game.prototype.drawNextLevelWord = function() {
    this.ctx.font = "48px VectorBattle";
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Brace Yourself", 175, 220);
    this.ctx.fillText("for level " + this.level, 200, 320);
  };

  Game.prototype.isWon = function () {
    return this.asteroids.length === 0;
  };

  Game.prototype.addAsteroid = function (options) {
    this.asteroids.push(
      new Asteroids.Asteroid({
        pos: options.pos,
        radius: options.radius,
        maxSpeed: options.maxSpeed,
        direction: options.direction
      })
    );
  };

  Game.prototype.renderStats = function() {
    this.ctx.font = "24px VectorBattle";
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Point total: " + this.points, 10, 40);
    this.ctx.fillText("Lives: " + this.lives, 10, 80);
    this.ctx.fillText("Level: " + this.level, 10, 120);
  };

  Game.prototype.renderNewGameText = function() {
    this.ctx.font = "42px VectorBattle";
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Press Spacebar to", 125, 200);
    this.ctx.fillText("Start a New Game!", 125, 300);
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);

    var oldPoints = this.points;

    if(asteroid.radius === Game.BIG_ASTEROID_RADIUS / 4) {
      this.points += Game.SMALL_ASTEROID_POINTS;
    } else if (asteroid.radius === Game.BIG_ASTEROID_RADIUS / 2) {
      this.points += Game.MID_ASTEROID_POINTS;
    } else {
      this.points += Game.BIG_ASTEROID_POINTS;
    }

    if(this.points % Game.EXTRA_LIFE < oldPoints % Game.EXTRA_LIFE) {
      this.lives += 1;
    }

    if(asteroid.radius === Game.BIG_ASTEROID_RADIUS / 4) {
      return;
    }

    var smallerOptions = {
      pos: [asteroid.x, asteroid.y],
      radius: asteroid.radius / 2,
      maxSpeed: asteroid.speed() * Game.SPEED_INCR
    };

    for(var i = 0; i < this.level; i++) {
      this.addAsteroid(smallerOptions);
    };
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.randomPos = function (objRadius) {
    var x = Math.random() * (Game.DIM_X - (2 * objRadius)) + objRadius;
    var y = Math.random() * (Game.DIM_Y - (2 * objRadius)) + objRadius;
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
    var bulletPos = [
      this.ship.x,
      this.ship.y
    ];

    var bulletDirection = this.ship.direction + Math.PI;
    this.bullets.push(new Asteroids.Bullet(bulletPos, bulletDirection));

    this.ship.x +=  this.ship.radialPos()[0] / 4;
    this.ship.y += this.ship.radialPos()[1] / 4;
  };

  Game.outOfBounds = function (pos) {
    return (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0);
  };

})();
