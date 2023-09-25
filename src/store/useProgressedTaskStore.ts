import { create } from "zustand";
import { useProfileStore } from "./useProfileStore";
import { ProgressedTaskType } from "@/models/ProgressedTaskType";

type ProgressedTaskStoreType = {
  progressedTask: ProgressedTaskType[];
  add: (task: ProgressedTaskType) => void;
  remove: (id: number) => void;
  update: (task: Omit<ProgressedTaskType, "startDate" | "updatedAt">) => void;
  init: () => void;
  updateOnLocalStorage: (tasks: ProgressedTaskType[]) => void;
  complete: (id: number) => void;
  uncomplete: (id: number) => void;
};

export const useProgressedTaskStore = create<ProgressedTaskStoreType>(
  (set) => ({
    progressedTask: [],

    startProgress: (id: number) => {
      set((state) => {
        const tasks = state.progressedTask.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isActive: true,
            };
          }
          return task;
        });
        state.updateOnLocalStorage(tasks);
        return {
          progressedTask: tasks,
        };
      });
    },

    stopProgress: (id: number) => {
      set((state) => {
        const tasks = state.progressedTask.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isActive: false,
            };
          }
          return task;
        });
        state.updateOnLocalStorage(tasks);
        return {
          progressedTask: tasks,
        };
      });
    },

    init: () => {
      try {
        const progressedTask = localStorage.getItem("progressedTask");
        const initDateISO = localStorage.getItem("initDate");
        if (!progressedTask) {
          throw new Error("Progressed tasks not found");
        }
        if (initDateISO) {
          // check if dates is different
          const initDate = new Date(initDateISO);
          const today = new Date();
          set((state) => ({
            progressedTask: JSON.parse(progressedTask),
          }));
          if (initDate.getDate() !== today.getDate()) {
            // mark all daily tasks uncompleted and update initDate
            const tasks = useProgressedTaskStore
              .getState()
              .progressedTask.map((task) => {
                return {
                  ...task,
                  hasCompleted: false,
                };
              });
            useProgressedTaskStore.getState().updateOnLocalStorage(tasks);
            set((state) => ({
              progressedTask: tasks,
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
        const tasks = state.progressedTask.map((task) => {
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
          progressedTask: tasks,
        };
      });
    },

    uncomplete: (id: number) => {
      set((state) => {
        const tasks = state.progressedTask.map((task) => {
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
          progressedTask: tasks,
        };
      });
    },

    updateOnLocalStorage: (tasks: ProgressedTaskType[]) => {
      set((state) => {
        localStorage.setItem("progressedTask", JSON.stringify(tasks));
        return {
          progressedTask: tasks,
        };
      });
    },

    add: (task: ProgressedTaskType) => {
      set((state) => {
        state.updateOnLocalStorage([...state.progressedTask, task]);
        return {
          progressedTask: [...state.progressedTask, task],
        };
      });
    },

    remove: (id) => {
      set((state) => {
        state.updateOnLocalStorage(
          state.progressedTask.filter((task) => task.id !== id)
        );
        return {
          progressedTask: state.progressedTask.filter((task) => task.id !== id),
        };
      });
    },

    update: (task) => {
      set((state) => {
        const tasks = state.progressedTask.map((t) => {
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
          progressedTask: tasks,
        };
      });
    },
  })
);
