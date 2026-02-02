import type { ChangeEvent } from "react";
import { initRobots, type Robot } from "../../utils/types";
import useSettings from "../../context/useSettings";

export default function RobotSelector() {
  const { selected, setSelected } = useSettings();
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelected(event.currentTarget.value);
  }

  return (
    <div className="flex relative w-full text-slate-50">
      <select
        id="robot_id"
        name="robot_id"
        className="rounded-full  cursor-pointer bg-slate-300 dark:bg-slate-800 px-2 ml-2 opacity-90 hover:opacity-100 active:scale-90 shadow-sm shadow-slate-600 active:shadow-none transition-all"
        onChange={onChange}
        value={selected}
      >
        <option value={""}>⤵ select robot</option>
        {initRobots &&
          initRobots.map((robot: Robot) => (
            <option key={robot.name} value={robot.name}>
              {robot.name}
            </option>
          ))}
      </select>
    </div>
  );
}
