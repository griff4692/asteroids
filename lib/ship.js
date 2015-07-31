(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function () {
    Asteroids.movingObject.call(this, {
      pos: Asteroids.Game.randomPos(Ship.RADIUS),
      vel: [0, 0],
      radius: Ship.RADIUS,
      direction: Math.PI / 2
    });
  };

  Asteroids.Util.inherits(Asteroids.movingObject, Ship);

  Ship.RADIUS = 25;
  Ship.MAX_SPEED = 5;
  Ship.sprite = new Image();
  Ship.sprite.src = 'http://griffinadams.com/asteroids/images/ship.jpg';

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction - Math.PI / 2);
    ctx.drawImage(Ship.sprite, 0, 0, 394, 350, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
    drawImageIOSFix(ctx, img, Ship.sprite, 0, 0, 394, 350, -this.radius, -this.radius, this.radius * 2, this.radius * 2);

    ctx.restore();

    this.redrawParticles(ctx);
  };

  Ship.prototype.radialPos = function () {
    return [
      this.radius * Math.cos(this.direction),
      this.radius * Math.sin(this.direction)
    ]
  };

  Ship.prototype.redrawParticles = function (ctx) {
    var baseX, baseY;

    for(var i = 0; i < this.speed() * 10; i++) {
      var particle = new Asteroids.Particle
        ({
          pos: this.generateParticlePos(),
          radius: 5
        })
      particle.draw(ctx);
    };
  };

  Ship.prototype.generateParticlePos = function () {
    return [
      this.x + Asteroids.Util.randomFromTo(-5, 5) + (this.radialPos()[0] * (Math.random() + 1)),
      this.y + Asteroids.Util.randomFromTo(-5, 5) + (this.radialPos()[1] * (Math.random() + 1))
    ]
  }

  Ship.prototype.relocate = function () {
    var coords = Asteroids.Game.randomPos(this.radius);
    this.x = coords[0];
    this.y = coords[1];
    this.vX = 0;
    this.vY = 0;
  };

  Ship.prototype.power = function (impulse) {
    if(this.speed() > Ship.MAX_SPEED) {
      this.vX *= Ship.MAX_SPEED / this.speed();
      this.vY *= Ship.MAX_SPEED / this.speed();
    }

    this.vX -= impulse * Math.cos(this.direction);
    this.vY -= impulse * Math.sin(this.direction);
  };

  Ship.prototype.rotate = function(radians) {
      this.direction = (this.direction + radians) % (Math.PI * 2);
      if (this.direction < 0) {
        this.direction += Math.PI * 2;
      };
  };

  /**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 *
 */
function detectVerticalSquash(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}

/**
 * A replacement for context.drawImage
 * (args are for source and destination).
 */
function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio = detectVerticalSquash(img);
 // Works only if whole image is displayed:
 // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
 // The following works correct also when only a part of the image is displayed:
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
                       sw * vertSquashRatio, sh * vertSquashRatio,
                       dx, dy, dw, dh );
}


})();
