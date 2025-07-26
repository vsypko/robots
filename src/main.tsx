import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.tsx';
import { RobotProvider } from './context/RobotContext.tsx';
import { MissionProvider } from './context/MissionContext.tsx';
import { CpProvider } from './context/CpContext.tsx';
import CameraProvider from './context/CameraProvider.tsx';

if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)
  document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');
const root = document.getElementById('root');
root!.setAttribute('class', 'bg-slate-200 dark:bg-slate-800');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CameraProvider>
      <RobotProvider>
        <CpProvider>
          <MissionProvider>
            <App />
          </MissionProvider>
        </CpProvider>
      </RobotProvider>
    </CameraProvider>
  </StrictMode>
);
