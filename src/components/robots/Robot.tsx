import { lazy } from "react";
import type { PerspectiveCamera as PerspectiveCameraType } from "three";

const R2D2 = lazy(() => import("./R2D2"));
const BB8 = lazy(() => import("./BB8"));
const BB9 = lazy(() => import("./BB9"));

export default function Robot({
  robot,
  camera,
}: {
  robot: string;
  camera: React.RefObject<PerspectiveCameraType | null>;
}) {
  switch (robot) {
    case "R2D2":
      return <R2D2 camera={camera} />;

    case "BB8":
      return <BB8 camera={camera} />;

    case "BB9":
      return <BB9 camera={camera} />;

    default:
      return null;
  }
}
