"use client";
import { TbUrgent } from "react-icons/tb";

import { useEffect, useMemo, useState } from "react";

import { useProgressedTaskStore } from "@/store/useProgressedTaskStore";
import { ProgressedTask } from "./ProgressedTask";

export const ProgressBoard = () => {
  const {
    progressedTask,
    add: addProgressedTask,
    init: initProgressedTasks,
  } = useProgressedTaskStore((state) => state);
  const [filter, setFilter] = useState("all");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const startDate = new Date().toISOString();
    addProgressedTask({
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: e.target.task.value,
      startDate: startDate,
      reward: 10,
      hasCompleted: false,
      updatedAt: startDate,
      progress: 5,
      limit: 10,
      dueDate: startDate,
      importancy: 1,
      urgency: 1,
    });
  };

  const listTasks = useMemo(() => {
    if (filter === "all") {
      return progressedTask.map((task) => (
        <ProgressedTask key={task.id} progressedTask={task} />
      ));
    }
    if (filter === "important") {
      return progressedTask
        .sort((a, b) => {
          return a.importancy - b.importancy;
        })
        .reverse()
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
    if (filter === "urgent") {
      return progressedTask
        .sort((a, b) => {
          return a.urgency - b.urgency;
        })
        .reverse()
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
    if (filter === "importantAndUrgent") {
      return progressedTask
        .sort((a, b) => {
          return a.importancy - b.importancy;
        })
        .reverse()
        .sort((a, b) => {
          return a.urgency - b.urgency;
        })
        .reverse()
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
    if (filter === "dueDate") {
      return progressedTask
        .sort((a, b) => {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
    if (filter === "limit") {
      return progressedTask
        .sort((a, b) => {
          return a.limit - b.limit;
        })
        .reverse()
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
    if (filter === "progress") {
      return progressedTask
        .sort((a, b) => {
          return a.progress - b.progress;
        })
        .reverse()
        .map((task) => <ProgressedTask key={task.id} progressedTask={task} />);
    }
  }, [progressedTask, filter]);

  useEffect(() => {
    initProgressedTasks();
  }, [progressedTask]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-[20px] w-full font-bold flex justify-between">
        <div>Progressed tasks</div>

        <div className="flex">
          <button
            onClick={
              filter === "all"
                ? () => setFilter("limit")
                : () => setFilter("all")
            }
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
            style={{
              color: filter === "limit" ? "red" : "black",
              backgroundColor: filter === "limit" ? "gray" : "white",
            }}
          >
            limit
          </button>
          <button
            onClick={
              filter === "all"
                ? () => setFilter("progress")
                : () => setFilter("all")
            }
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
            style={{
              color: filter === "progress" ? "red" : "black",
              backgroundColor: filter === "progress" ? "gray" : "white",
            }}
          >
            progress
          </button>
          <button
            onClick={
              filter === "all"
                ? () => setFilter("important")
                : () => setFilter("all")
            }
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
            style={{
              color: filter === "important" ? "red" : "black",
              backgroundColor: filter === "important" ? "gray" : "white",
            }}
          >
            important
          </button>
          <button
            onClick={
              filter === "all"
                ? () => setFilter("urgent")
                : () => setFilter("all")
            }
            style={{
              color: filter === "urgent" ? "red" : "black",
              backgroundColor: filter === "urgent" ? "gray" : "white",
            }}
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
          >
            urgent
          </button>

          <button
            onClick={
              filter === "all"
                ? () => setFilter("importantAndUrgent")
                : () => setFilter("all")
            }
            style={{
              color: filter === "importantAndUrgent" ? "red" : "black",
              backgroundColor:
                filter === "importantAndUrgent" ? "gray" : "white",
            }}
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
          >
            important and urgent
          </button>

          <button
            onClick={
              filter === "all"
                ? () => setFilter("dueDate")
                : () => setFilter("all")
            }
            style={{
              color: filter === "dueDate" ? "red" : "black",
              backgroundColor: filter === "dueDate" ? "gray" : "white",
            }}
            className="mr-5 bg-white border-2 border-black rounded-md px-2"
          >
            dueDate
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-5">
        <input
          name="task"
          type="text"
          placeholder="Add a progressed task"
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
        />
      </form>
      <div className="flex flex-col gap-10 mt-10 w-full">{listTasks}</div>
    </div>
  );
};
