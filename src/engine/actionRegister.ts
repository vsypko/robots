import type { ActionType } from '../utils/types';

const actions = new Map<string, ActionType>();

// Registration hook.
export function useActionRegister() {
  const actionRegister = (action: ActionType, key: string) => {
    actions.clear();
    actions.set(key, action);
  };

  const clearRegister = () => actions.clear();

  return {
    actionRegister,
    clearRegister,
  };
}

export const getAction = (key: string) => actions.get(key);
export const getActions = () => actions;
