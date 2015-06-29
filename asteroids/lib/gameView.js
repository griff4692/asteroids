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
      this.game.draw(this.ctx);
      this.game.moveObjects();
    }.bind(this), 1000 / 60);
  };
})();
