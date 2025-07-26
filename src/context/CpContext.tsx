import { useContext, createContext, useReducer } from 'react';
import type { Dispatch, ReactElement } from 'react';
import type { CheckPoint } from '../utils/types';

interface Action {
  type: 'add' | 'edit' | 'update' | 'remove';
  payload: CheckPoint;
}

function cpReducer(state: CheckPoint[], action: Action): CheckPoint[] {
  switch (action.type) {
    case 'add': {
      const cp = action.payload;
      return [...state, cp];
    }

    case 'edit': {
      const { name } = action.payload;
      return state.map((cp) => (cp.name === name ? { ...cp, selected: true } : cp));
    }

    case 'update': {
      return state.map((cp) => (cp.selected ? action.payload : cp));
    }

    case 'remove': {
      const { name } = action.payload;
      return state.filter((cp) => cp.name !== name);
    }

    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

const CpContext = createContext<CheckPoint[]>([]);
const CpDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useCp() {
  const context = useContext(CpContext);
  if (context === undefined) {
    throw new Error('useCp must be used within a CpProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCpDispatch() {
  const context = useContext(CpDispatchContext);
  if (context === undefined) {
    throw new Error('useMissionDispatch must be used within a MissionProvider');
  }
  return context;
}

export function CpProvider({ children }: { children: ReactElement }) {
  const [cps, dispatch] = useReducer(cpReducer, []);

  return (
    <CpContext.Provider value={cps}>
      <CpDispatchContext.Provider value={dispatch}>{children}</CpDispatchContext.Provider>
    </CpContext.Provider>
  );
}
