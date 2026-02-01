import { useContext } from 'react';
import JoystickContext from './JoystickContext';

export default function useJoystick() {
  const context = useContext(JoystickContext);
  if (!context) {
    throw new Error('useJoystick must be used within a JoystickProvider');
  }
  return context;
}
