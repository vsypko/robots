import { useState } from 'react';
import { useRobots } from '../../context/RobotContext';
import MissionForm from './MissionForm';
import { initMission } from '../../utils/types';
import type { Mission } from '../../utils/types';
import { useMissionDispatch, useMissions } from '../../context/MissionContext';
import { Delete, Edit, ReportsIcon, SiteIcon } from '../../utils/Icons';

export function MissionsList() {
  const missions = useMissions();
  const [formIsOpen, setFormIsOpen] = useState(false);
  //   const [isInZero, setIsInZero] = useState(false);
  //   const [isBusy, setIsBusy] = useState(false);

  const dispatch = useMissionDispatch();
  const robots = useRobots();

  function getMissionRobot(mission: Mission) {
    return robots.find((robot) => robot.id === mission.robot_id);
  }

  function handleAddMission() {
    dispatch({ type: 'add', payload: { ...initMission, id: missions.length } });
    setFormIsOpen(true);
  }

  function handleMissionEdit(mission: Mission) {
    dispatch({ type: 'edit', payload: { ...mission, selected: true } });
    setFormIsOpen(true);
  }

  async function handleMissionStop(mission: Mission) {
    dispatch({ type: 'update', payload: { ...mission, active: false } });
  }

  // Starting or pausing mission: loading the mission's Robot, or removing it from render.

  //   async function handleMissionActive(mission: MissionType) {
  //     const status = mission.active;

  //     const isRobotOnZero = activeRobots.some((robot) => Math.abs(robot.pose_x) <= 1 && Math.abs(robot.pose_z) <= 1);
  //     const activeRobot = activeRobots.find((robot) => robot.id === mission.robot_id);
  //     const robot = getMissionRobot(mission);
  //     console.log(robot?.name);

  //     if (status && activeRobot) {
  //       dispatch({ type: "remove", payload: activeRobot });
  //       const { id, pose_x, pose_z, angle } = activeRobot;
  //       await savePosition({ id, pose_x, pose_z, angle });
  //       setRobots(await getRobots());
  //       setMissions(missions.map((item) => ({ ...item, active: item.id === mission.id ? !status : item.active })));
  //       return;
  //     }
  //     if (!status && activeRobot) return setIsBusy(true);

  //     if (robot) {
  //       if (isRobotOnZero && robot.pose_x === 0 && robot.pose_z === 0) return setIsInZero(true);
  //       dispatch({ type: "add", payload: robot });
  //     }
  //     setMissions(missions.map((item) => ({ ...item, active: item.id === mission.id ? !status : item.active })));
  //   }

  //   function handleNewMission() {
  //     setFormIsOpen(true);
  //     setMissions(missions.map((mission) => ({ ...mission, selected: false })));
  //   }

  function handleDeleteMission(mission: Mission) {
    dispatch({ type: 'remove', payload: mission });
  }

  //--------------------------------------------------------------------

  return (
    <div className="w-full text-lg dark:text-slate-200 text-slate-800 md:p-2 p-1 z-20">
      <h1 className="font-bold italic">MISSIONS:</h1>
      <ul className="space-y-1 min-h-40 overflow-y-auto snap-y rounded-2xl bg-slate-300 dark:bg-slate-900 p-1 relative">
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
                  className="px-3 opacity-75 hover:opacity-100 active:scale-90"
                >
                  <ReportsIcon size={24} className="stroke-white stroke-[0.5] fill-none" />
                </button>
                {/* Play/pause mission button ------------------------------------------------*/}
                {/* <button
                    onClick={() => handleMissionActive(mission)}
                    className="px-3 opacity-75 hover:opacity-100 active:scale-90"
                  >
                    <i className={`fas ${mission.active ? "fa-pause text-orange-400" : "fa-play text-emerald-500"}`} />
                  </button> */}
                {/* Edit mission button ------------------------------------------------*/}
                <button
                  onClick={() => handleMissionEdit(mission)}
                  type="button"
                  className="px-3 opacity-75 hover:opacity-100 active:scale-90 text-blue-400 disabled:text-slate-400 disabled:opacity-75 disabled:scale-100"
                  disabled={formIsOpen}
                >
                  <Edit size={20} className="stroke-sky-500 stroke-1 fill-none" />
                </button>

                <button
                  onClick={() => handleDeleteMission(mission)}
                  type="button"
                  className="px-3 opacity-75 hover:opacity-100 active:scale-90"
                >
                  <Delete size={20} className="stroke-red-400 stroke-1 fill-none" />
                </button>
              </div>
            </li>
          ))}
      </ul>
      {/* {isInZero && <span className="text-orange-500">The zero position for robot initiation is occupied</span>}
      {isBusy && <span className="text-orange-500">The robot is involved in another mission</span>} */}
      {!formIsOpen && (
        <button
          onClick={handleAddMission}
          className="w-full mt-1 px-2 rounded-full dark:bg-teal-800 bg-teal-500 opacity-70 hover:opacity-100 active:scale-90"
        >
          <i className="fas fa-plus mr-2" />
          <span>CREATE NEW MISSION</span>
        </button>
      )}
      {formIsOpen && <MissionForm setOpen={setFormIsOpen} />}
    </div>
  );
}
