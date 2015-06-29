(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.start = function () {
    setInterval(function () {
      this.game.step(this.ctx);
    }.bind(this), 1000 / 30);
  };
})();
