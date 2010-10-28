function AStar(start, end, grid, getNeighbors, distanceBetween) {
  var closedSet = new Array();
  var openSet = new Array();
  openSet.push(start);

  while (openSet.length > 0) {
    var x = getLowestFScore(openSet);
    var node = openSet[x];

    // Check if this is the end node.
    if (node.equals(end)) {
      return constructPath(end, new Array(end));
    }

    // Remove node from openSet.
    openSet.splice(x, 1);

    // Add node to closedSet.
    closedSet.push(node);

    // Get neighbors.
    var neighbors = getNeighbors(node, grid);
    var neighborsCount = neighbors.length;
    while (neighborsCount--) {
      var neighbor = neighbors[neighborsCount];
      // Check if it is in the closedSet.
      if (!isInSet(neighbor, closedSet)) {
        // Get this gScore.
        var tempGScore = distanceBetween(start, node) + distanceBetween(node, neighbor);
        var isBetter = false;

        // Check to see if it is in the openSet.
        if (!isInSet(neighbor, openSet)) {
          openSet.push(neighbor);
          isBetter = true;
        } else if (tempGScore < neighbors[neighborsCount].gScore) {
          // gScore is better than before;
          isBetter = true;
        }

        if (isBetter) {
          neighbor.cameFrom = node;
          neighbor.gScore = tempGScore;
          neighbor.hScore = distanceBetween(neighbor, end);
          neighbor.fScore = neighbor.gScore + neighbor.hScore;
        }
      }
    }
  }
}

// Get the index of the lowest fScore in set.
function getLowestFScore(set) {
  var count = set.length;
  var lowest = 0;
  while (count--) {
    if (set[count].fScore < lowest) {
      lowest = count;
    }
  }
  return lowest;
}

function constructPath(node, path) {
  if (node.cameFrom != null) {
    path.push(node.cameFrom);
    return constructPath(node.cameFrom, path);
  } else {
    // Reverse this array.
    var newPath = new Array();
    var count = path.length;
    while (count--) {
      newPath.push(path[count]);
    }
    return newPath;
  }
}

function isInSet(node, set) {
  var count = set.length;

  while (count--) {
    if (node.equals(set[count])) {
      return true;
    }
  }
  return false;
}

function getNeighbors(node, grid) {
  var neighbors = new Array();
  var tile;
  if (node.y > 0) {
    neighbors.push(grid.getTile(node.x, node.y - 1));
  }
  if (node.x < grid.width - 1) {
    neighbors.push(grid.getTile(node.x + 1, node.y));
  }
  if (node.y < grid.height - 1) {
    neighbors.push(grid.getTile(node.x, node.y + 1));
  }
  if (node.x > 0) {
    neighbors.push(grid.getTile(node.x - 1, node.y));
  }

  return neighbors;
}

function distanceBetween(current, target) {
  var dx = target.x - current.x;
  var dy = target.y - current.y;
  return Math.sqrt(dx * dx + dy * dy);
}
