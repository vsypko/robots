import { useState } from 'react';
import type { ChangeEvent, SetStateAction, Dispatch } from 'react';
import type { Mission, Robot } from '../../utils/types';
import { useRobots } from '../../context/RobotContext';
import { useMissionDispatch, useMissions } from '../../context/MissionContext';
import { Xmark } from '../../utils/Icons';
import { useCp } from '../../context/CpContext';

export default function MissionForm({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const robots = useRobots();
  const cps = useCp();
  const missions = useMissions();
  const mission = missions.find((mission) => mission.selected);
  const dispatch = useMissionDispatch();
  const [editMission, setEditMission] = useState<Mission>(mission!);

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    let value: number | string = event.target.value;
    if (event.target.name === 'id' || event.target.name === 'robot_id') value = Number(value);
    dispatch({ type: 'update', payload: { ...mission!, [event.target.name]: value } });
    setEditMission({ ...editMission, [event.target.name]: value });
  }

  async function handleSaveMission() {
    dispatch({ type: 'update', payload: { ...editMission, selected: false } });
    setOpen(false);
  }

  return (
    <div className="w-full flex flex-col bg-slate-300 dark:bg-slate-900 rounded-2xl p-1 relative">
      <button
        type="button"
        onClick={() => {
          setOpen(false);
        }}
        className="absolute right-2 top-1 opacity-75 hover:opacity-100 active:scale-90"
      >
        <Xmark size={20} className="stroke-slate-500 stroke-1 fill-amber-300" />
      </button>
      <div className="flex w-full relative mt-6 mb-2 px-1">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={onChange}
          value={editMission.name}
          className={`ml-2 w-4/5 bg-transparent opacity-90 focus:outline-none hover:opacity-100 focus:opacity-100 peer`}
        />
        <div className="absolute w-0 left-16 transition-all duration-300 ease-in-out border-slate-500 bottom-0 peer-focus:w-4/5 peer-focus:border-b" />
      </div>

      <div className="flex relative w-full">
        <label htmlFor="robot_id">Robot:</label>
        <select
          id="robot_id"
          name="robot_id"
          className="rounded-full  cursor-pointer bg-slate-300 dark:bg-slate-800 px-2 ml-2 opacity-90 hover:opacity-100 active:scale-90 shadow-sm shadow-slate-600 active:shadow-none transition-all"
          onChange={onChange}
          value={editMission.robot_id}
        >
          <option value={-1}>⤵ select robot</option>
          {robots &&
            robots.map((robot: Robot) => (
              <option key={robot.id} value={robot.id}>
                {robot.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col w-full">
        <button className="flex w-full justify-between items-center text-5xl">
          <span className="text-base">Add Check Point:</span>
          <span className="flex justify-end text-5xl items-center text-lime-500">+</span>
        </button>

        <div className="flex relative w-full">
          <select
            id="cp"
            name="cp"
            className="rounded-full  cursor-pointer bg-slate-300 dark:bg-slate-800 px-2 ml-2 opacity-90 hover:opacity-100 active:scale-90 shadow-sm shadow-slate-600 active:shadow-none transition-all"
            onChange={onChange}
            value={editMission.checkPoints.length > 0 ? editMission.checkPoints[0].name : -1}
          >
            <option value={-1}>⤵ select checkpoint</option>
            {cps &&
              cps.map((cp) => (
                <option key={cp.name} value={cp.name}>
                  {cp.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleSaveMission}
        className="w-full mt-4 px-2 rounded-full bg-teal-500 dark:bg-teal-800 opacity-70 hover:opacity-100 active:scale-90"
      >
        <span>SAVE MISSION</span>
      </button>
    </div>
  );
}
