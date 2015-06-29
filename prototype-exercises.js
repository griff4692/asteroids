Function.prototype.inherits = function (superClass) {
  var Surrogate = function () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};

function MovingObject (x, y) {
  this.x = x;
  this.y = y;
};

function Ship (x, y, type) {
  MovingObject.call(this, x, y);
  this.type = type;

};
Ship.inherits(MovingObject);

Ship.prototype.myType = function () {
  return "My type is " + this.type;
}

function Asteroid (x, y, speed) {
  MovingObject.call(this, x, y);
  this.speed = speed;
};
Asteroid.inherits(MovingObject);

m = new MovingObject(5, 10);
s = new Ship(10, 15, "sailboat");
