"use client";

import { useEffect, useMemo } from "react";
import { Habit } from "./Habit";
import { useHabitStore } from "@/store/useHabitTaskStore";
import { CreateHabit } from "./HabitCreateForm";
import { InitHabits } from "./InitHabits";

export const HabitBoard = () => {
  const { habits, init: initHabits } = useHabitStore();

  const listHabits = useMemo(() => {
    return (
      <>
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
      </>
    );
  }, [habits]);

  return (
    <div className="flex flex-col items-center w-[350px]">
      <div className="text-[20px] w-full font-bold">
        <span>Habits</span>
      </div>
      <CreateHabit />
      <InitHabits />
      <div className="flex flex-col gap-10 mt-10 w-full">{listHabits}</div>
    </div>
  );
};
