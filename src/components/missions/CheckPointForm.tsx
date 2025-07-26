import { useState } from 'react';
import type { ChangeEvent, SetStateAction, Dispatch } from 'react';
import type { CheckPoint } from '../../utils/types';
import { useCp, useCpDispatch } from '../../context/CpContext';
import { Xmark } from '../../utils/Icons';

export default function CpForm({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const cps = useCp();
  const cp = cps.find((cp) => cp.selected);
  const dispatch = useCpDispatch();
  const [editCp, setEditCp] = useState<CheckPoint>(cp!);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    let value: number | string = event.target.value;
    if (event.target.name !== 'name') value = Number(value);
    dispatch({ type: 'update', payload: { ...cp!, [event.target.name]: value } });
    setEditCp({ ...editCp, [event.target.name]: value });
  }

  async function handleSaveCp() {
    dispatch({ type: 'update', payload: { ...editCp, selected: false } });
    setOpen(false);
  }

  return (
    <div className="w-full flex flex-col bg-slate-300 dark:bg-slate-900 rounded-2xl p-1 relative">
      <button
        type="button"
        onClick={() => {
          setOpen(false);
        }}
        className="absolute right-2 top-1 opacity-75 hover:opacity-100 active:scale-90"
      >
        <Xmark size={20} className="stroke-slate-500 stroke-1 fill-amber-300" />
      </button>
      {Object.keys(editCp).map((keyStr) => {
        const key = keyStr as keyof CheckPoint;
        if (key && typeof editCp[key] !== 'boolean')
          return (
            <div key={key} className="flex w-full relative my-2 px-1 capitalize">
              <label htmlFor={key}>{key}:</label>
              <input
                id={key}
                type={typeof editCp[key] === 'number' ? 'number' : 'text'}
                name={key}
                step={0.1}
                onChange={onChange}
                value={editCp[key]}
                className={`ml-2 w-4/5 bg-transparent opacity-90 focus:outline-none hover:opacity-100 focus:opacity-100 peer`}
              />
              <div className="absolute w-0 left-16 transition-all duration-300 ease-in-out border-slate-500 bottom-0 peer-focus:w-4/5 peer-focus:border-b" />
            </div>
          );
      })}
      <button
        onClick={handleSaveCp}
        className="w-full mt-4 px-2 rounded-full bg-teal-500 dark:bg-teal-800 opacity-70 hover:opacity-100 active:scale-90"
      >
        <i className="fas fa-floppy-disk mr-4" />
        <span>SAVE CHECKPOINT</span>
      </button>
    </div>
  );
}
