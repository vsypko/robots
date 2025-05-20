import type { Robot } from "../../utils/types";

export default function RobotPosition({ robot }: { robot: Robot | undefined }) {
  return (
    <div className="flex flex-col">
      {robot && <p className="text-lime-600">Robot position X = {robot.x.toFixed(2)}</p>}
      {robot && <p className="text-lime-600">Robot position Z = {robot.z.toFixed(2)}</p>}
    </div>
  );
}
