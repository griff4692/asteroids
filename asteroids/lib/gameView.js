(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    setInterval(function () {
      this.game.step(this.ctx);
    }.bind(this), 1000 / 60);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    var game = this.game;

    key('left', function () {
      ship.rotate(Math.PI / 18);
    });
    key('right', function () {
      ship.rotate(- Math.PI / 18);
    });
    key('up', function () {
      ship.power(1);
    });
    key('space', function () {
      game.shoot();
    })
  };
})();
