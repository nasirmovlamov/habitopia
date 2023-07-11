"use client";

import { HabitBoard } from "@/habits/HabitBoard";
import { DailyBoard } from "../tasks/DailyBoard";
import { MarketBoard } from "../market/MarketBoard";

export const Board = () => {
  return (
    <div className="flex flex-col items-center">
      {/* <div className="text-2xl">Board</div> */}
      <div className="flex gap-10 mt-10">
        {/* All boards goes here */}
        <HabitBoard />
        <DailyBoard />
        <MarketBoard />
      </div>
    </div>
  );
};
