import { useState, type ReactNode } from 'react';
import { CameraContext } from './CameraContext';

export default function CameraProvider({ children }: { children: ReactNode }) {
  const [selfCamera, setSelfCamera] = useState<number>(0);
  return <CameraContext.Provider value={{ selfCamera, setSelfCamera }}>{children}</CameraContext.Provider>;
}
