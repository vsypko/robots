import { useRobots, useRobotsDispatch } from '../../context/RobotContext';

export default function CameraToggle() {
  const robots = useRobots()
  const selfCamera = robots.some(robot => robot.selfCamera);
  const dispatch = useRobotsDispatch();

  const handleClick = () => {
    const robot = robots.find(robot => robot.selected);
    dispatch({ type: 'selfCamera', payload: robot ? robot.id : 0 });
  }

  return (
    <div className="flex w-full justify-center">
      <button
        className={`flex p-2 ${!selfCamera ? 'bg-emerald-600' : 'bg-amber-600'
          } text-white rounded-full hover:opacity-90 active:scale-95 transition-all`}
        onClick={handleClick}
      >
        {selfCamera ? 'Disable Self Camera' : 'Enable Self Camera'}
      </button>
    </div>
  );
}
