import JoystickButton from './JoystickButton';
import RobotPosition from './RobotPosition';
import { WiFi } from '../../utils/Icons';
import type { Robot } from '../../utils/types';
import { useMissions } from '../../context/MissionContext';
import { useRobots } from '../../context/RobotContext';
import { useEffect, useState } from 'react';

export default function Joystick() {
  const [robot, setRobot] = useState<Robot | undefined>(undefined);
  const missions = useMissions();
  const robots = useRobots();

  useEffect(() => {
    const mission = missions.find((mission) => mission.selected);
    if (mission) {
      setRobot(robots.find((robot) => robot.id === mission.robot_id));
    }
  }, [missions, robots]);

  return (
    <div className="absolute w-full flex justify-center bottom-4 text-slate-200 z-10">
      <div className="flex flex-col">
        <div className="text-slate-600 dark:text-slate-200 w-full items-start text-xl p-2">
          <RobotPosition robot={robot} />
        </div>
        <div className="flex w-full justify-center">
          <JoystickButton keypressed="ArrowUp" robot={robot} />
        </div>
        <div className="flex w-full justify-center items-center">
          <JoystickButton keypressed="ArrowLeft" robot={robot} />

          <WiFi size={70} className={`stroke-4 fill-none ${robot ? 'stroke-orange-600' : 'stroke-lime-700'}`} />

          <JoystickButton keypressed="ArrowRight" robot={robot} />
        </div>
        <div className="flex w-full justify-center">
          <JoystickButton keypressed="ArrowDown" robot={robot} />
        </div>
      </div>
    </div>
  );
}
