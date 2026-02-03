import type { RapierRigidBody } from "@react-three/rapier";
import type { Dispatch, SetStateAction } from "react";
import type { Group } from "three";

export type Mission = {
  id: number;
  name: string;
  checkPoints: CheckPoint[];
  robot: string;
  selected: boolean;
  active: boolean;
};

export type Robot = {
  name: string;
  x: number;
  y: number;
  z: number;
  angle: number;
  selected?: boolean;
};

export type CheckPoint = {
  name: string;
  selected: boolean;
  x: number;
  z: number;
  angle: number;
};

export const initCp: CheckPoint = {
  name: "",
  selected: true,
  x: 0.0,
  z: 0.0,
  angle: 3.14
};

export const initMission: Mission = {
  id: 0,
  name: "",
  checkPoints: [],
  robot: "",
  active: false,
  selected: true
};

export const initRobots: Robot[] = [
  {
    name: "R2D2",
    x: -5.0,
    y: -0.55,
    z: 0.0,
    angle: 0,
    selected: false
  },
  {
    name: "BB8",
    x: 0.0,
    y: 0.46,
    z: 0.0,
    angle: 0,
    selected: false
  },
  {
    name: "BB9",
    x: 5.0,
    y: -0.6,
    z: 0.0,
    angle: 0,
    selected: false
  }
];

export type SettingsType = {
  light: boolean;
  setLight: Dispatch<SetStateAction<boolean>>;
  map: boolean;
  setMap: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export const initSettings: SettingsType = {
  light: true,
  setLight: () => {},
  map: true,
  setMap: () => {},
  selected: "",
  setSelected: () => {}
};

export type RobotRegisterType = {
  base?: RapierRigidBody;
  body?: Group;
};

export type JoystickType = {
  x: number;
  z: number;
  // angle: number;
};

export const initJoystick: JoystickType = {
  x: 0,
  z: 0
  // angle: 0,
};
