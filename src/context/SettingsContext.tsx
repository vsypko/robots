import { createContext, useState, type ReactNode } from "react";
import { initSettings, type SettingsType } from "../utils/types";

const SettingsContext = createContext<SettingsType>(initSettings);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [light, setLight] = useState<boolean>(initSettings.light);
  const [map, setMap] = useState<boolean>(initSettings.map);
  const [selected, setSelected] = useState<string>("");

  return (
    <SettingsContext.Provider value={{ light, setLight, map, setMap, selected, setSelected }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
