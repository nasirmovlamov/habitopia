"use client";

import { useHabitService } from "@/hooks/useHabitsHook";
import { HabitType } from "@/model/HabitType";
import { useEffect, useMemo } from "react";
import { Habit } from "./Habit";
import { useHabitStore } from "@/store/useHabitTaskStore";

export const HabitBoard = () => {
  const { habits, add: addHabit, init: initHabits } = useHabitStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addHabit({
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      startDate: new Date().toISOString(),
      counter: 0,
      reward: 5,
    });
  };

  const listHabits = useMemo(() => {
    return (
      <>
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
      </>
    );
  }, [habits]);

  useEffect(() => {
    initHabits();
  }, []);

  return (
    <div className="flex flex-col items-center w-[450px]">
      <div className="text-2xl w-full">
        <span>Habits</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          name="task"
          type="text"
          placeholder="Add a Habit"
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-10 mt-10 w-full">{listHabits}</div>
    </div>
  );
};
