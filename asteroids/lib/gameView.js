(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Asteroids.Game(this.ctx);
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    setInterval(function () {
      this.game.step(this.ctx);
    }.bind(this), 100 / 3);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    var game = this.game;

    key('left', function () {
      ship.rotate(- Math.PI / 4.5);
    });
    key('right', function () {
      ship.rotate(Math.PI / 4.5);
    });
    key('up', function () {
      ship.power(1);
    });
    key('space', function () {
      game.shoot();
    })
  };
})();
