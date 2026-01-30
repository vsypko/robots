import { movement } from '../utils/movement';
import type { Robot } from '../utils/types';

export function robotReducer(
  state: Robot[],
  action: { type: string; payload: number | { key?: string; id?: number; another?: { x: number; z: number } } },
): Robot[] {
  switch (action.type) {
    case 'select': {
      const select = action.payload;
      return state.map((robot) => ({
        ...robot,
        selected: robot.id === select,
      }));
    }

    case 'move': {
      const { key, id } = action.payload as { key: string; id?: number };
      const robot = state.find((robot) => robot.selected);
      if (!robot) return state;
      const { x, z, angle } = movement(key, robot.x, robot.z, robot.angle, robot?.id);
      return state.map((robot) => (robot.selected || (id && robot.id === id) ? { ...robot, x, z, angle } : robot));
    }

    case 'collision': {
      const { id, another } = action.payload as { id: number; another: { x: number; z: number } };
      const robot = state.find((robot) => robot.id === id);
      if (!robot) return state;
      const { x, z, angle } = movement('collision', robot.x, robot.z, robot.angle, robot.id, another);
      return state.map((robot) => (robot.id === id ? { ...robot, x, z, angle } : robot));
    }

    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
