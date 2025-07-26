import { createContext, type Dispatch, type SetStateAction } from 'react';

export const CameraContext = createContext<{ selfCamera: boolean; setSelfCamera: Dispatch<SetStateAction<boolean>> }>({
  selfCamera: false,
  setSelfCamera: () => {},
});
