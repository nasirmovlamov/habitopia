export interface IDeck {
  name: string;
  urgency: number;
  desire: number;
  importancy: number;
  clockify: number;
  badges: string[];
  average: number;
}

export const deck: IDeck[] = [
  {
    name: "hobby",
    urgency: 1,
    desire: 1,
    importancy: 1,
    clockify: 0,
    badges: [],
    average: 1,
  },
  {
    name: "books",
    urgency: 1,
    desire: 1,
    importancy: 1,
    clockify: 2,
    badges: [],
    average: 1,
  },
  {
    name: "computer-science",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: 2,
    badges: [],
    average: 1,
  },
  {
    name: "life",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: 2,
    badges: [],
    average: 1,
  },
  {
    name: "movie",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: 2,
    badges: [],
    average: 1,
  },
  {
    name: "music",
    urgency: 1,
    desire: 1,
    importancy: 10,
    clockify: 2,
    badges: [],
    average: 1,
  },
];
