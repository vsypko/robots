import { lazy } from "react";
import type { Robot } from "../../utils/types";

const R2D2 = lazy(() => import("./R2D2"));
const BB8 = lazy(() => import("./BB8"));
const BB9 = lazy(() => import("./BB9"));

export default function Robot({ robot }: { robot: Robot }) {
  switch (robot.name) {
    case "R2D2":
      return <R2D2 robot={robot} />;

    case "BB8":
      return <BB8 robot={robot} />;

    case "BB9":
      return <BB9 robot={robot} />;

    default:
      return null;
  }
}
