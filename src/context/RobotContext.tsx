import { useContext, createContext, useReducer, useEffect } from 'react';
import { initRobots } from '../utils/types';
import type { Dispatch, ReactElement } from 'react';
import type { Robot } from '../utils/types';
import { movement } from '../utils/movement';
import { CameraContext } from './CameraContext';

function robotReducer(
  state: Robot[],
  action: { type: string; payload: number | { key?: string; id?: number, another?: { x: number, z: number } } },
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
      return state.map((robot) =>
        robot.selected || (id && robot.id === id) ? { ...robot, x, z, angle } : robot,
      );
    }

    case 'collision': {
      const { id, another } = action.payload as { id: number; another: { x: number; z: number } };
      const robot = state.find((robot) => robot.id === id);
      if (!robot) return state;
      const { x, z, angle } = movement('collision', robot.x, robot.z, robot.angle, robot.id, another);
      return state.map((robot) =>
        robot.id === id ? { ...robot, x, z, angle } : robot,
      );
    }

    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

const RobotContext = createContext<Robot[]>(initRobots);
const RobotDispatchContext = createContext<
  Dispatch<{ type: string; payload: number | { key?: string; id?: number, another?: { x: number, z: number } } }> | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useRobots() {
  const context = useContext(RobotContext);
  if (context === undefined) {
    throw new Error('useRobots must be used within a RobotProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRobotsDispatch() {
  const context = useContext(RobotDispatchContext);
  if (context === undefined) {
    throw new Error('useRobotsDispatch must be used within a RobotProvider');
  }
  return context;
}

export function RobotProvider({ children }: { children: ReactElement }) {
  const [robots, dispatch] = useReducer(robotReducer, initRobots);
  const { selfCamera, setSelfCamera } = useContext(CameraContext);

  useEffect(() => {
    const id = robots.find(robot => robot.selected)?.id || 0;
    if (selfCamera !== 0) setSelfCamera(id);
  }, [robots, selfCamera, setSelfCamera]);

  return (
    <RobotContext.Provider value={robots}>
      <RobotDispatchContext.Provider value={dispatch}>{children}</RobotDispatchContext.Provider>
    </RobotContext.Provider>
  );
}
