"use client";

import { HabitBoard } from "@/habit/HabitBoard";
import { DailyBoard } from "./DailyBoard";
import { MarketBoard } from "./MarketBoard";

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
