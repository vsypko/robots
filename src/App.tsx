// import CameraToggle from './components/controls/CameraToggle';
import Joystick from "./components/controls/Joystick";
import Toggle from "./components/controls/Toggle";
import Scene from "./components/scene3D/Scene";
// import { CheckPointsList } from "./components/missions/CheckPointsList";
// import { MissionsList } from "./components/missions/MissionsList";
import RobotSelector from "./components/controls/RobotSelector";
import useSettings from "./context/useSettings";

export default function App() {
  const { light, setLight, map, setMap } = useSettings();
  return (
    <div className="w-full h-screen md:overflow-hidden p-2 md:flex relative">
      {/* <div className="hidden md:flex w-full h-full mb-2 md:mb-0 md:mr-2 md:w-1/5 rounded-2xl border-slate-800 dark:border-slate-200 border relative"> */}
      {/* <div className="flex flex-col w-full">
          <CheckPointsList />
          <MissionsList />
        </div> */}
      {/* </div> */}
      <div className="absolute top-4 right-4 z-10 flex gap-x-1 align-center">
        <RobotSelector />
        <Toggle value={light} setValue={setLight} title="Light" />
        <Toggle value={map} setValue={setMap} title="Map" />
      </div>
      <div className="absolute w-40 h-40 flex z-20 right-4 bottom-4 touch-none overscroll-none">
        <Joystick size={160} />
      </div>
      <div className="w-full h-full rounded-2xl border-slate-800 dark:border-slate-200 border overflow-hidden">
        <Scene />
      </div>
    </div>
  );
}
