"use client";

import { useHabitService } from "@/hooks/useHabitsHook";
import { useMemo } from "react";

export const HabitBoard = () => {
  const { habits, loading, addHabit } = useHabitService();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addHabit({
      // random id
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      startDate: new Date().toISOString(),
    });
  };

  const listHabits = useMemo(() => {
    return habits.map((habit) => (
      <div
        key={habit.id}
        className="flex flex-col items-center bg-gray-100 p-5 rounded-md text-black text-start"
      >
        <div className="text-2xl w-full">{habit.name}</div>
        <div className=" w-full">{habit.description}</div>
        <div className=" w-full">{habit.startDate}</div>
      </div>
    ));
  }, [habits]);

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
      <div className="flex flex-col gap-10 mt-10 w-full">
        {!loading && listHabits}

        {loading && (
          // list tasks here
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
