import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from '../../utils/Icons';
import { useRobotsDispatch } from '../../context/RobotContext';

export default function JoystickButton({ keypressed }: { keypressed: string }) {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const dispatch = useRobotsDispatch();

  const triggerKeyEvent = useCallback(
    (type: 'keydown' | 'keyup') => {
      const event = new KeyboardEvent(type, { key: keypressed });
      window.dispatchEvent(event);
    },
    [keypressed],
  );

  function handlePointerDown() {
    setIsPointerDown(true);
    triggerKeyEvent('keydown');
  }

  function handlePointerUp() {
    if (isPointerDown) {
      setIsPointerDown(false);
      triggerKeyEvent('keyup');
    }
  }

  useEffect(() => {
    let interval: number | undefined;

    if (isPointerDown) {
      interval = setInterval(() => {
        triggerKeyEvent('keydown');
      }, 30);
    }

    function handleKeyPress(e: KeyboardEvent) {
      dispatch({ type: 'move', payload: { key: e.key } });
    }

    function handleKeyUp() {
      setIsPointerDown(false);
      window.removeEventListener('keydown', handleKeyPress, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    }

    window.addEventListener('keydown', handleKeyPress, true);
    window.addEventListener('keyup', handleKeyUp, true);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener('keydown', handleKeyPress, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [dispatch, isPointerDown, triggerKeyEvent]);

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      className="text-5xl text-emerald-500 rounded-full active:scale-90 opacity-70 hover:opacity-100"
    >
      {keypressed === 'ArrowUp' && <ArrowUp size={70} className="stroke-lime-600 stroke-2 fill-none" />}
      {keypressed === 'ArrowDown' && <ArrowDown size={70} className="stroke-lime-600 stroke-2 fill-none" />}
      {keypressed === 'ArrowLeft' && <ArrowLeft size={70} className="stroke-lime-600 stroke-2 fill-none" />}
      {keypressed === 'ArrowRight' && <ArrowRight size={70} className="stroke-lime-600 stroke-2 fill-none" />}
    </button>
  );
}
