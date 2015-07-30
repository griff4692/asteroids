(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = true;
    this.game = new Asteroids.Game(this.ctx);
    this.game.draw();
    this.bindKeyHandlers();
  };

  GameView.TIME_STEP = 0.001;
  GameView.ROTATION = Math.PI / 9;
  GameView.BOOST = 1;

  GameView.prototype.start = function () {
    this.game.started = true;
    this.game.over = false;

    var gameLoop = setInterval(function () {
      if (this.game.isWon()) {
        clearInterval(gameLoop);
        this.game.nextLevel(),
        setTimeout(function () {
          clearInterval(Asteroids.Game.Transition);
          this.start();
        }.bind(this), 2000)
      } else if(! this.game.over) {
        this.game.step(this.ctx);
      } else {
        this.game.endGame();
        clearInterval(gameLoop);
      }
      }.bind(this)

    , GameView.TIME_STEP);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    var game = this.game;
    var view = this;

    key('left', function () {
      ship.rotate(- GameView.ROTATION);
    });
    key('right', function () {
      ship.rotate(GameView.ROTATION);
    });
    key('up', function () {
      ship.power(GameView.BOOST);
    });
    key('space', function () {
      if(game.started) {
       game.shoot();
       } else {
       view.start();
      }
    })
  };
})();
