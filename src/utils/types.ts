export type Mission = {
  id: number;
  name: string;
  checkPoints: Pose[];
  robot_id: number;
  selected: boolean;
  active: boolean;
};

export type Robot = {
  id: number;
  name: string;
  x: number;
  z: number;
  angle: number;
};

export type Pose = {
  x: number;
  z: number;
  angle: number;
};

export const initMission: Mission = {
  id: 0,
  name: "",
  checkPoints: [],
  robot_id: -1,
  active: false,
  selected: true,
};

export const initRobots: Robot[] = [
  {
    id: 0,
    name: "R2D2",
    x: -5.0,
    z: 0.0,
    angle: Math.PI,
  },
  {
    id: 1,
    name: "BB8",
    x: 0.0,
    z: 0.0,
    angle: Math.PI,
  },
  {
    id: 2,
    name: "BB9",
    x: 5.0,
    z: 0.0,
    angle: Math.PI,
  },
];
