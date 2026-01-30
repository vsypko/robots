import { createContext, useRef } from "react";
import { initMotion } from "../utils/types";
import type { ReactNode } from "react";
import type { MotionType } from "../utils/types";

const MotionContext = createContext<React.RefObject<MotionType>>({ current: initMotion });

export function MotionProvider({ children }: { children: ReactNode }) {
  const motionRef = useRef<MotionType>(initMotion);

  return <MotionContext.Provider value={motionRef}>{children}</MotionContext.Provider>;
}
export default MotionContext;
