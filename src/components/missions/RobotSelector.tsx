import type { ChangeEvent } from 'react';
import { useRobots, useRobotsDispatch } from '../../context/RobotContext';
import type { Robot } from '../../utils/types';

export default function RobotSelector() {
  const robots = useRobots();
  const id = robots.find((robot) => robot.selected)?.id;
  const dispatch = useRobotsDispatch();
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: 'select', payload: Number(event.currentTarget.value) });
  }

  return (
    <div className="flex relative w-full text-slate-50 mt-2 ml-2">
      <label htmlFor="robot_id">Robot:</label>
      <select
        id="robot_id"
        name="robot_id"
        className="rounded-full  cursor-pointer bg-slate-300 dark:bg-slate-800 px-2 ml-2 opacity-90 hover:opacity-100 active:scale-90 shadow-sm shadow-slate-600 active:shadow-none transition-all"
        onChange={onChange}
        value={id}
      >
        <option value={0}>⤵ select robot</option>
        {robots &&
          robots.map((robot: Robot) => (
            <option key={robot.id} value={robot.id}>
              {robot.name}
            </option>
          ))}
      </select>
    </div>
  );
}
