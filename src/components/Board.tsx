"use client";

import { DailyBoard } from "./DailyBoard";
import { HabitBoard } from "./HabitBoard";

export const Board = () => {

  return (
    <div className="flex flex-col items-center">
      {/* <div className="text-2xl">Board</div> */}
      <div className="flex gap-10 mt-10">
        {/* All boards goes here */}
        <HabitBoard />
        <DailyBoard />
      </div>
    </div>
  );
};
