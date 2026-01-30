// import CameraToggle from './components/controls/CameraToggle';
import Joystick from "./components/controls/Joystick";
import Toggle from "./components/controls/Toggle";
import Court from "./components/court/Court";
import { CheckPointsList } from "./components/missions/CheckPointsList";
import { MissionsList } from "./components/missions/MissionsList";
import RobotSelector from "./components/missions/RobotSelector";
import { useSettings } from "./context/useSettings";

export default function App() {
  const { light, setLight, map, setMap } = useSettings();
  return (
    <div className="w-full h-screen md:overflow-hidden p-2 md:flex">
      <div className="hidden md:flex w-full h-full mb-2 md:mb-0 md:mr-2 md:w-1/5 rounded-2xl border-slate-800 dark:border-slate-200 border relative">
        <div className="flex flex-col w-full">
          <RobotSelector />
          <CheckPointsList />
          <MissionsList />
          <div className="flex w-full gap-x-1">
            <Toggle value={light} setValue={setLight} title="Light" />
            <Toggle value={map} setValue={setMap} title="Map" />
          </div>
        </div>

        <Joystick />
      </div>
      <div className="w-full md:w-4/5 h-full rounded-2xl border-slate-800 dark:border-slate-200 border overflow-hidden">
        <Court />
      </div>
    </div>
  );
}
