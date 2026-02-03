import { useState, useRef, memo } from 'react';
import type { PointerEvent } from 'react';
import { useActionRegister } from '../../engine/actionRegister';
import useSettings from '../../context/useSettings';

const initPosition = {
  x: 0,
  y: 0,
};

type PositionType = {
  x: number;
  y: number;
};

const Joystick = memo(({ size }: { size: number }) => {
  const { selected } = useSettings();
  const { actionRegister } = useActionRegister();

  // Stick is currently being captured.
  const [stickCaptured, setStickCaptured] = useState<boolean>(false);

  // Translation of the stick.
  const [translation, setTranslation] = useState<PositionType>(initPosition);

  // Distance from center reference.
  const distance = useRef<PositionType>(initPosition);

  // Touchpoint position reference.
  const touchPoint = useRef<PositionType>(initPosition);

  // Pointer ID reference
  const pointerRef = useRef<number | null>(null);

  // Pointer ID reference for Stop button.
  const pointerStopRef = useRef<number | null>(null);

  const stickRadius = size / 4;

  //Event handler for pointer down.
  function handlePointerDown(e: PointerEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerRef.current = e.pointerId;
    setStickCaptured(true);
    distance.current = initPosition;
    // Initial touch point reference.
    touchPoint.current = { x: e.clientX, y: e.clientY };
  }

  //Event handler for pointer move.
  function handlePointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (!stickCaptured) return;
    e.stopPropagation();

    // Define delta movement.
    const dx = e.clientX - touchPoint.current.x;
    const dy = e.clientY - touchPoint.current.y;

    // Update touch point.
    touchPoint.current = { x: e.clientX, y: e.clientY };

    // Define the x- and y-components of velocity.
    let x = distance.current.x + dx;
    let y = distance.current.y + dy;
    // const theta = angleBetweenVectors({ x: distance.current.x, z: distance.current.y }, { x, z: y });

    // Update current distance from center.
    distance.current = { x, y };

    const distanceFromCenter = Math.hypot(x, y);

    // Update velocity components (distance from center) when touchpoint exceeds joystick radius.
    if (distanceFromCenter >= stickRadius) {
      x = stickRadius * (x / distanceFromCenter);
      y = stickRadius * (y / distanceFromCenter);
    }

    // Set stick translation.
    setTranslation({ x, y });

    // Velocities are computed from normalized pointer X/Y offsets.
    actionRegister({ angvel: x / stickRadius, linvel: -y / stickRadius }, selected);
  }

  //Event handler for pointer up which resets logic.
  function handlePointerUp(e: PointerEvent<HTMLButtonElement>) {
    if (e.pointerId !== pointerRef.current && !stickCaptured) return;
    e.stopPropagation();
    if (e.currentTarget) e.currentTarget.releasePointerCapture(e.pointerId);
    actionRegister({ angvel: 0, linvel: 0 }, selected);
    pointerRef.current = null;
    pointerStopRef.current = null;
    setStickCaptured(false);
    setTranslation(initPosition);
    distance.current = initPosition;
    touchPoint.current = initPosition;
  }

  const handleContextMenu = (e: React.PointerEvent<HTMLButtonElement>) => e.preventDefault();

  return (
    <div
      className={`relative w-full h-full flex justify-center items-center rounded-full bg-edw-800 shadow-inner shadow-slate-900/50 border-3 border-teal-500`}
    >
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onContextMenu={handleContextMenu}
        tabIndex={-1}
        className={`absolute landscape:opacity-80 bg-teal-500 flex rounded-full w-1/2 h-1/2 shadow-md shadow-slate-900/50 cursor-pointer active:cursor-grabbing ${
          stickCaptured ? ' cursor-move' : ''
        }`}
        style={{
          transform: `translate(
          ${translation.x}px,
          ${translation.y}px
          )`,
          caretColor: 'transparent',
        }}
      ></button>
    </div>
  );
});
export default Joystick;
