type Point = [number, number];
type Graph = Map<string, Point[]>;
type Obstacle = { center: Point; radius: number };

const MIN = -18;
const MAX = 18;

function pointToString(p: Point): string {
  return `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
}

function distance(a: Point, b: Point): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const d = Math.sqrt(dx * dx + dy * dy);
  return d < 1e-6 ? 0 : d;
}

function isObstacle(x: number, y: number, obstacles: Obstacle[]): boolean {
  for (const {
    center: [cx, cy],
    radius,
  } of obstacles) {
    const dx = x - cx;
    const dy = y - cy;
    if (Math.abs(dx) <= radius && Math.abs(dy) <= radius) {
      return true;
    }
  }
  return false;
}

function buildGraph(step: number, obstacles: Obstacle[]): Graph {
  const graph: Graph = new Map();

  for (let x = MIN; x <= MAX; x += step) {
    for (let y = MIN; y <= MAX; y += step) {
      if (isObstacle(x, y, obstacles)) continue;

      const neighbors: Point[] = [];

      for (const dx of [-step, 0, step]) {
        for (const dy of [-step, 0, step]) {
          if (dx === 0 && dy === 0) continue;
          const nx = parseFloat((x + dx).toFixed(1));
          const ny = parseFloat((y + dy).toFixed(1));

          if (nx >= MIN && nx <= MAX && ny >= MIN && ny <= MAX && !isObstacle(nx, ny, obstacles)) {
            neighbors.push([nx, ny]);
          }
        }
      }
      graph.set(pointToString([x, y]), neighbors);
    }
  }
  return graph;
}

function dijkstra(start: Point, goal: Point, graph: Graph, step: number): Point[] | null {
  const startKey = pointToString(start);
  const goalKey = pointToString(goal);

  const visited = new Set<string>();
  const cameFrom = new Map<string, string>();
  const costSoFar = new Map<string, number>();
  costSoFar.set(startKey, 0);

  const queue: [number, Point][] = [[0, start]];

  while (queue.length > 0) {
    queue.sort((a, b) => a[0] - b[0]);
    const [cost, current] = queue.shift()!;
    const currentKey = pointToString(current);

    if (distance(current, goal) === 0) break;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    const neighbors = graph.get(currentKey) || [];

    for (const neighbor of neighbors) {
      const neighborKey = pointToString(neighbor);
      const newCost = cost + distance(current, neighbor);

      if (!costSoFar.has(neighborKey) || newCost < costSoFar.get(neighborKey)!) {
        costSoFar.set(neighborKey, newCost);
        cameFrom.set(neighborKey, currentKey);
        queue.push([newCost, neighbor]);
      }
    }
  }

  const path: Point[] = [];
  let currentKey = pointToString(goal);

  if (!cameFrom.has(currentKey)) return null;

  while (currentKey !== startKey) {
    const [x, y] = currentKey.split(',').map(Number);
    path.push([x, y]);
    currentKey = cameFrom.get(currentKey)!;
  }

  path.push(start);
  path.reverse();

  return path;
}
