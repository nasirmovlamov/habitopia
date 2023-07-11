"use client";

import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import { useEffect, useMemo } from "react";
import { DailyTask } from "./DailyTask";

export const DailyBoard = () => {
  const {
    dailyTasks,
    add: addDailyTask,
    init: initDailyTasks,
  } = useDailyTaskStore((state) => state);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startDate = new Date().toISOString();
    addDailyTask({
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      startDate: startDate,
      reward: 10,
      hasCompleted: false,
      updatedAt: startDate,
    });
  };

  const listTasks = useMemo(() => {
    return dailyTasks.map((task) => (
      <DailyTask key={task.id} dailyTask={task} />
    ));
  }, [dailyTasks]);

  useEffect(() => {
    initDailyTasks();
  }, [initDailyTasks]);

  return (
    <div className="flex flex-col items-center w-[350px]">
      <div className="text-[20px] w-full font-bold">
        <span>Dailies</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-5">
        <input
          name="task"
          type="text"
          placeholder="Add a Daily"
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-10 mt-10 w-full">{listTasks}</div>
    </div>
  );
};
