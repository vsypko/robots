import { useContext } from "react";
import MotionContext from "./MotionContext";

export default function useMotion() {
  const motionRef = useContext(MotionContext);
  if (!motionRef) {
    throw new Error("useMotions must be used within a MotionProvider");
  }
  return motionRef;
}
