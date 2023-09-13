export interface IDeck {
  name: string;
  urgency: number;
  desire: number;
  importancy: number;
  clockify: string;
  badges: string[];
  average: number;
}

export const deck: IDeck[] = [
  {
    name: "tanner",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: "2",
    badges: ["test"],
    average: 1,
  },
  {
    name: "tanner",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: "2",
    badges: ["test"],
    average: 1,
  },
  {
    name: "tanner",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: "2",
    badges: ["test"],
    average: 1,
  },
  {
    name: "tanner",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: "2",
    badges: ["test", "test2"],
    average: 1,
  },
  {
    name: "tanner",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: "2",
    badges: ["test"],
    average: 1,
  },
];
