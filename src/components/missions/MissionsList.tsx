import { useState } from 'react';
import { useRobots } from '../../context/RobotContext';
import MissionForm from './MissionForm';
import { initMission } from '../../utils/types';
import type { Mission } from '../../utils/types';
import { useMissionDispatch, useMissions } from '../../context/MissionContext';
import { DeleteIcon, EditIcon, StopIcon } from '../../utils/Icons';
import { useCp } from '../../context/CpContext';

export function MissionsList() {
  const missions = useMissions();
  const cps = useCp();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const dispatch = useMissionDispatch();
  const robots = useRobots();

  function getMissionRobot(mission: Mission) {
    return robots.find((robot) => robot.id === mission.robot_id);
  }

  function handleAddMission() {
    if (cps.length > 0) {
      dispatch({ type: 'add', payload: { ...initMission, id: missions.length } });
      setFormIsOpen(true);
    }
  }

  function handleMissionEdit(mission: Mission) {
    dispatch({ type: 'edit', payload: { ...mission, selected: true } });
    setFormIsOpen(true);
  }

  async function handleMissionStop(mission: Mission) {
    dispatch({ type: 'update', payload: { ...mission, active: false } });
  }

  function handleDeleteMission(mission: Mission) {
    dispatch({ type: 'remove', payload: mission });
  }

  //--------------------------------------------------------------------

  return (
    <div className="w-full dark:text-slate-200 text-slate-800 md:p-2 p-1 z-20">
      <h1>Missions:</h1>
      <ul className="space-y-1 min-h-30 overflow-y-auto snap-y rounded-2xl bg-slate-300 dark:bg-slate-900 p-1 relative">
        {missions &&
          missions.length > 0 &&
          missions.map((mission) => (
            <li
              key={mission.id}
              className={`flex w-full items-center justify-between cursor-pointer group text-slate-800 dark:text-slate-200`}
            >
              <div className="place-items-start px-1 rounded-full group:hover:bg-teal-400 dark:group-hover:bg-teal-800">
                <span className="mr-3">{mission.name}</span>
                <span className="font-bold italic text-lime-500">{getMissionRobot(mission)?.name}</span>
              </div>

              <div className="flex justify-end text-2xl">
                <button
                  onClick={() => handleMissionStop(mission)}
                  className="px-1 opacity-75 hover:opacity-100 active:scale-90"
                >
                  <StopIcon size={26} className="stroke-white stroke-[0.5] fill-none" />
                </button>

                <button
                  onClick={() => handleMissionEdit(mission)}
                  type="button"
                  className="px-1 opacity-75 hover:opacity-100 active:scale-90 text-blue-400 disabled:text-slate-400 disabled:opacity-75 disabled:scale-100"
                  disabled={formIsOpen}
                >
                  <EditIcon size={24} className="stroke-sky-500 stroke-1 fill-none" />
                </button>

                <button
                  onClick={() => handleDeleteMission(mission)}
                  type="button"
                  className="px-1 opacity-75 hover:opacity-100 active:scale-90"
                >
                  <DeleteIcon size={26} className="stroke-red-400 stroke-1 fill-none" />
                </button>
              </div>
            </li>
          ))}
      </ul>

      {!formIsOpen && (
        <button
          onClick={handleAddMission}
          className="w-full mt-1 px-2 rounded-full dark:bg-teal-800 bg-teal-500 opacity-70 hover:opacity-100 active:scale-90"
        >
          <span>CREATE NEW MISSION</span>
        </button>
      )}
      {formIsOpen && <MissionForm setOpen={setFormIsOpen} />}
    </div>
  );
}
