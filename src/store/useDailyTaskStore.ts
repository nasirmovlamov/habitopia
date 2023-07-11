import { create } from "zustand";
import { useProfileStore } from "./useProfileStore";
import { DailyTaskType } from "@/models/DailyTaskType";

type DailyTaskStoreType = {
  dailyTasks: DailyTaskType[];
  add: (task: DailyTaskType) => void;
  remove: (id: number) => void;
  update: (task: Omit<DailyTaskType, "startDate" | "updatedAt">) => void;
  init: () => void;
  updateOnLocalStorage: (tasks: DailyTaskType[]) => void;
  complete: (id: number) => void;
  uncomplete: (id: number) => void;
};

export const useDailyTaskStore = create<DailyTaskStoreType>((set) => ({
  dailyTasks: [],
  init: () => {
    try {
      const dailyTasks = localStorage.getItem("dailyTasks");
      const initDateISO = localStorage.getItem("initDate");
      if (!dailyTasks) {
        throw new Error("Daily tasks not found");
      }
      if (initDateISO) {
        // check if dates is different
        const initDate = new Date(initDateISO);
        const today = new Date();
        set((state) => ({
          dailyTasks: JSON.parse(dailyTasks),
        }));
        if (initDate.getDate() !== today.getDate()) {
          // mark all daily tasks uncompleted and update initDate
          const tasks = useDailyTaskStore.getState().dailyTasks.map((task) => {
            return {
              ...task,
              hasCompleted: false,
            };
          });
          useDailyTaskStore.getState().updateOnLocalStorage(tasks);
          set((state) => ({
            dailyTasks: tasks,
          }));
          localStorage.setItem("initDate", today.toISOString());
        }
      } else {
        localStorage.setItem("initDate", new Date().toISOString());
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },

  complete: (id: number) => {
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
      const reward = tasks.find((task) => task.id === id)?.reward;
      if (reward) {
        useProfileStore.getState().gainGp(reward);
      }
      state.updateOnLocalStorage(tasks);
      return {
        dailyTasks: tasks,
      };
    });
  },

  uncomplete: (id: number) => {
    set((state) => {
      const tasks = state.dailyTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            hasCompleted: false,
          };
        }
        return task;
      });
      const reward = tasks.find((task) => task.id === id)?.reward;
      if (reward) {
        useProfileStore.getState().gainGp(-reward);
      }
      state.updateOnLocalStorage(tasks);
      return {
        dailyTasks: tasks,
      };
    });
  },

  updateOnLocalStorage: (tasks: DailyTaskType[]) => {
    set((state) => {
      localStorage.setItem("dailyTasks", JSON.stringify(tasks));
      return {
        dailyTasks: tasks,
      };
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
  remove: (id) => {
    set((state) => {
      state.updateOnLocalStorage(
        state.dailyTasks.filter((task) => task.id !== id)
      );
      return {
        dailyTasks: state.dailyTasks.filter((task) => task.id !== id),
      };
    });
  },
  update: (task) => {
    set((state) => {
      const tasks = state.dailyTasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...task,
            startDate: t.startDate,
            updatedAt: new Date().toISOString(),
          };
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
