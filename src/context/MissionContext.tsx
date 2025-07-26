import { useContext, createContext, useReducer } from 'react';
import type { Dispatch, ReactElement } from 'react';
import type { Mission } from '../utils/types';

interface MissionAction {
  type: 'add' | 'edit' | 'update' | 'remove';
  payload: Mission;
}

function missionReducer(state: Mission[], action: MissionAction): Mission[] {
  switch (action.type) {
    case 'add': {
      const mission = action.payload;
      return [...state, mission];
    }

    case 'edit': {
      const { id } = action.payload;
      return state.map((mission) => (mission.id === id ? { ...mission, selected: true } : mission));
    }

    case 'update': {
      const { id } = action.payload;
      return state.map((mission) => (mission.id === id ? action.payload : mission));
    }

    case 'remove': {
      const { id } = action.payload;
      return state.filter((mission) => mission.id !== id);
    }

    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

const MissionContext = createContext<Mission[]>([]);
const MissionDispatchContext = createContext<Dispatch<MissionAction> | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useMissions() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMissionDispatch() {
  const context = useContext(MissionDispatchContext);
  if (context === undefined) {
    throw new Error('useMissionDispatch must be used within a MissionProvider');
  }
  return context;
}

export function MissionProvider({ children }: { children: ReactElement }) {
  const [missions, dispatch] = useReducer(missionReducer, []);

  return (
    <MissionContext.Provider value={missions}>
      <MissionDispatchContext.Provider value={dispatch}>{children}</MissionDispatchContext.Provider>
    </MissionContext.Provider>
  );
}
