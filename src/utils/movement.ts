type Another = {
  x: number;
  z: number;
};
export function movement(keycode: string, x: number, z: number, currentAngl: number, id: number, another?: Another) {
  let angle = currentAngl;
  const border = 18;
  const step = 0.05;

  if (another) {
    if (x >= another.x) x += step;
    if (x < another.x) x -= step;
    if (z >= another.z) z += step;
    if (z < another.z) z -= step;

    return { x, z, angle };
  }

  switch (keycode) {
    case 'ArrowLeft':
      angle = Math.PI / 2;
      if (x < -border) {
        x += step;
        break;
      }
      x -= step;
      break;

    case 'ArrowRight':
      angle = -Math.PI / 2;
      if (x > border) {
        x -= step;
        break;
      }
      x += step;
      break;

    case 'ArrowUp':
      angle = 0;
      if (z < -border) {
        z += step;
        break;
      }
      z -= step;
      break;

    case 'ArrowDown':
      angle = Math.PI;
      if (z > border) {
        z -= step;
        break;
      }
      z += step;
      break;

    default:
      break;
  }

  return { x, z, angle };
}
