import { useContext } from 'react';
import { CameraContext } from '../../context/CameraContext';

export default function CameraToggle() {
  const { selfCamera, setSelfCamera } = useContext(CameraContext);
  return (
    <div className="flex w-full justify-center">
      <button
        className={`flex p-2 ${
          !selfCamera ? 'bg-emerald-600' : 'bg-amber-600'
        } text-white rounded-full hover:opacity-90 active:scale-95 transition-all`}
        onClick={() => setSelfCamera(!selfCamera)}
      >
        {selfCamera ? 'Disable Self Camera' : 'Enable Self Camera'}
      </button>
    </div>
  );
}
