import { useState } from 'react';
import CpForm from './CheckPointForm';
import { initCp } from '../../utils/types';
import type { CheckPoint } from '../../utils/types';
import { DeleteIcon, EditIcon } from '../../utils/Icons';
import { useCp, useCpDispatch } from '../../context/CpContext';

export function CheckPointsList() {
  const cps = useCp();
  const [formIsOpen, setFormIsOpen] = useState(false);

  const dispatch = useCpDispatch();

  function handleAddCp() {
    dispatch({ type: 'add', payload: { ...initCp } });
    setFormIsOpen(true);
  }

  function handleCpEdit(cp: CheckPoint) {
    dispatch({ type: 'edit', payload: { ...cp, selected: true } });
    setFormIsOpen(true);
  }

  function handleDeleteCp(cp: CheckPoint) {
    dispatch({ type: 'remove', payload: cp });
  }

  //--------------------------------------------------------------------

  return (
    <div className="w-full dark:text-slate-200 text-slate-800 md:p-2 p-1 z-20">
      <h1>Check Points:</h1>
      <ul className="space-y-1 min-h-30 overflow-y-auto snap-y rounded-2xl bg-slate-300 dark:bg-slate-900 p-1 relative">
        {cps &&
          cps.length > 0 &&
          cps.map((cp) => (
            <li
              key={cp.name}
              className={`flex w-full items-center justify-between cursor-pointer group text-slate-800 dark:text-slate-200`}
            >
              <div className="place-items-start px-1 rounded-full group:hover:bg-teal-400 dark:group-hover:bg-teal-800">
                <span className="mr-3">{cp.name}</span>
              </div>

              <div className="flex justify-end text-2xl">
                <button
                  onClick={() => handleCpEdit(cp)}
                  type="button"
                  className="px-1 opacity-75 hover:opacity-100 active:scale-90 text-blue-400 disabled:text-slate-400 disabled:opacity-75 disabled:scale-100"
                  disabled={formIsOpen}
                >
                  <EditIcon size={24} className="stroke-sky-500 stroke-1 fill-none" />
                </button>

                <button
                  onClick={() => handleDeleteCp(cp)}
                  type="button"
                  className="px-1 opacity-75 hover:opacity-100 active:scale-90"
                >
                  <DeleteIcon size={26} className="stroke-red-400 stroke-1 fill-none" />
                </button>
              </div>
            </li>
          ))}
      </ul>

      {!formIsOpen && (
        <button
          onClick={handleAddCp}
          className="w-full mt-1 px-2 rounded-full dark:bg-teal-800 bg-teal-500 opacity-70 hover:opacity-100 active:scale-90"
        >
          <i className="fas fa-plus mr-2" />
          <span>CREATE NEW CHECK POINT</span>
        </button>
      )}
      {formIsOpen && <CpForm setOpen={setFormIsOpen} />}
    </div>
  );
}
