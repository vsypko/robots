import Joystick from './components/controls/Joystick';
import Scene from './components/scene3D/Scene';
// import { CheckPointsList } from "./components/missions/CheckPointsList";
// import { MissionsList } from "./components/missions/MissionsList";
import RobotSelector from './components/controls/RobotSelector';
import useSettings from './context/useSettings';
import { LidarIcon, LightIcon, MapIcon } from './utils/Icons';

export default function App() {
  const { light, setLight, map, setMap, fpv, setFpv } = useSettings();
  return (
    <div className="w-full h-screen md:overflow-hidden p-2 md:flex relative">
      {/* <div className="hidden md:flex w-full h-full mb-2 md:mb-0 md:mr-2 md:w-1/5 rounded-2xl border-slate-800 dark:border-slate-200 border relative"> */}
      {/* <div className="flex flex-col w-full">
          <CheckPointsList />
          <MissionsList />
        </div> */}
      {/* </div> */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-y-4 items-end">
        <RobotSelector />
        <button className="cursor-pointer active:scale-75 transition-all size-7 mr-2" onClick={() => setLight(!light)}>
          <LightIcon className={`${light ? 'fill-amber-300 stroke-slate-50' : 'fill-none stroke-slate-600'}`} />
        </button>
        <button className="cursor-pointer active:scale-75 transition-all size-6 mr-2" onClick={() => setMap(!map)}>
          <MapIcon
            className={`size-7 stroke-2 ${map ? 'fill-green-500 stroke-slate-50' : 'fill-none stroke-slate-300'}`}
          />
        </button>
        <button className="cursor-pointer active:scale-75 transition-all size-6 mr-2" onClick={() => setFpv(!fpv)}>
          <LidarIcon className={`size-7 stroke-2 ${fpv ? ' stroke-indigo-600' : 'stroke-slate-600'}`} />
        </button>
      </div>
      <div className="absolute w-[7em] h-[7em] flex z-20 right-10 bottom-12 touch-none overscroll-none">
        <Joystick size={105} />
      </div>
      {map && !light && (
        <div className="absolute left-[0.9rem] top-[0.9rem] w-[11.5rem] h-[11.5rem] rounded-2xl border-slate-800 dark:border-slate-200 border overflow-hidden z-1" />
      )}
      <div className="w-full h-full rounded-2xl border-slate-800 dark:border-slate-200 border overflow-hidden">
        <Scene />
      </div>
    </div>
  );
}
