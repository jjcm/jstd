function Node(x, y) {
  this.x = x;
  this.y = y;
  this.gScore = 10000;
  this.hScore = 10000;
  this.fScore = 10000;
  this.cameFrom = null;
}

Node.prototype.equals = function(node) {
  return this.x == node.x && this.y == node.y;
}
