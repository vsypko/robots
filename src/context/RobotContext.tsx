import { useContext, createContext, useReducer } from "react";
import { initRobots } from "../utils/types";
import type { Dispatch, ReactElement } from "react";
import type { Robot } from "../utils/types";
import { robotReducer } from "./robotReducer";

const RobotContext = createContext<Robot[]>(initRobots);
const RobotDispatchContext = createContext<
  | Dispatch<{
      type: string;
      payload: number | { key?: string; id?: number; another?: { x: number; y: number; z: number } };
    }>
  | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useRobots() {
  const context = useContext(RobotContext);
  if (context === undefined) {
    throw new Error("useRobots must be used within a RobotProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRobotsDispatch() {
  const context = useContext(RobotDispatchContext);
  if (context === undefined) {
    throw new Error("useRobotsDispatch must be used within a RobotProvider");
  }
  return context;
}

export function RobotProvider({ children }: { children: ReactElement }) {
  const [robots, dispatch] = useReducer(robotReducer, initRobots);

  return (
    <RobotContext.Provider value={robots}>
      <RobotDispatchContext.Provider value={dispatch}>{children}</RobotDispatchContext.Provider>
    </RobotContext.Provider>
  );
}
