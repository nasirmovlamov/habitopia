import { DailyTaskType } from "@/model/DailyTaskType";
import { create } from "zustand";

type DailyTaskStoreType = {
  dailyTasks: DailyTaskType[];
  add: (task: DailyTaskType) => void;
  remove: (id: number) => void;
  update: (task: DailyTaskType) => void;
  init: () => void;
  updateOnLocalStorage: (tasks: DailyTaskType[]) => void;
};

export const useDailyTaskStore = create<DailyTaskStoreType>((set) => ({
  dailyTasks: [],
  init: () => {
    try {
      const dailyTasks = localStorage.getItem("dailyTasks");
      if (!dailyTasks) {
        throw new Error("Daily tasks not found");
      }
      set((state) => ({
        dailyTasks: JSON.parse(dailyTasks),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },

  completeTask: (id: number) => {
    set((state) => {
      const tasks = state.dailyTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            hasCompleted: true,
          };
        }
        return task;
      });
      state.updateOnLocalStorage(tasks);
      return {
        dailyTasks: tasks,
      };
    });
  },

  updateOnLocalStorage: (tasks: DailyTaskType[]) => {
    set((state) => {
      localStorage.setItem("dailyTasks", JSON.stringify(tasks));
      return state;
    });
  },
  add: (task: DailyTaskType) => {
    set((state) => {
      state.updateOnLocalStorage([...state.dailyTasks, task]);
      return {
        dailyTasks: [...state.dailyTasks, task],
      };
    });
  },
  remove: (id: number) => {
    set((state) => {
      state.updateOnLocalStorage(
        state.dailyTasks.filter((task) => task.id !== id)
      );
      return {
        dailyTasks: state.dailyTasks.filter((task) => task.id !== id),
      };
    });
  },
  update: (task: DailyTaskType) => {
    set((state) => {
      const tasks = state.dailyTasks.map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
      state.updateOnLocalStorage(tasks);
      return {
        dailyTasks: tasks,
      };
    });
  },
}));
