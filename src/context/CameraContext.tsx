import { createContext, type Dispatch, type SetStateAction } from 'react';

export const CameraContext = createContext<{ selfCamera: number; setSelfCamera: Dispatch<SetStateAction<number>> }>({
  selfCamera: 0,
  setSelfCamera: () => { },
});
