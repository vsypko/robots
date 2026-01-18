import { useContext } from 'react';
import { CameraContext } from '../../context/CameraContext';
import { useRobots } from '../../context/RobotContext';

export default function CameraToggle() {
  const { selfCamera, setSelfCamera } = useContext(CameraContext);
  const robots = useRobots()
  const handleClick = () => {
    const id = robots.find(robot => robot.selected)?.id || 0;
    if (selfCamera !== 0) {
      setSelfCamera(0)
      return
    };
    setSelfCamera(id);
  }
  return (
    <div className="flex w-full justify-center">
      <button
        className={`flex p-2 ${selfCamera === 0 ? 'bg-emerald-600' : 'bg-amber-600'
          } text-white rounded-full hover:opacity-90 active:scale-95 transition-all`}
        onClick={handleClick}
      >
        {selfCamera ? 'Disable Self Camera' : 'Enable Self Camera'}
      </button>
    </div>
  );
}
