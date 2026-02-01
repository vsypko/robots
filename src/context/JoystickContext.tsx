import { createContext, useRef, type ReactNode, type RefObject } from "react";
import { initJoystick, type JoystickType } from "../utils/types";

const JoystickContext = createContext<RefObject<JoystickType>>({ current: initJoystick });

export const JoystickProvider = ({ children }: { children: ReactNode }) => {
  const joystickRef = useRef<JoystickType>(initJoystick);

  return <JoystickContext.Provider value={joystickRef}>{children}</JoystickContext.Provider>;
};

export default JoystickContext;