"use client";

import { useDailyTaskService } from "@/hooks/useDailyTaskHook";
import { useEffect, useMemo } from "react";

export const DailyBoard = () => {
  const { tasks, addTask, loading } = useDailyTaskService();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTask({
      // random id
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      startDate: new Date().toISOString(),
    });
  };

  const listTasks = useMemo(() => {
    return tasks.map((task) => (
      <div
        key={task.id}
        className="flex flex-col items-center bg-gray-100 p-5 rounded-md text-black text-start"
      >
        <div className="text-2xl w-full">{task.name}</div>
        <div className=" w-full">{task.description}</div>
        <div className=" w-full">{task.startDate}</div>
      </div>
    ));
  }, [tasks]);

  return (
    <div className="flex flex-col items-center w-[450px]">
      <div className="text-2xl w-full">
        <span>Dailies</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          name="task"
          type="text"
          placeholder="Add a Daily"
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-10 mt-10 w-full">
        {!loading && listTasks}

        {loading && (
          // list tasks here
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
