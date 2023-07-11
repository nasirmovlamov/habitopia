import { create } from "zustand";
import { useProfileStore } from "./useProfileStore";
import { HabitType } from "@/models/HabitType";

type HabitStoreType = {
  habits: HabitType[];
  get: (id: number) => HabitType | undefined;
  add: (habit: HabitType) => void;
  remove: (id: number) => void;
  update: (habit: HabitType) => void;
  init: () => void;
  updateOnLocalStorage: (habits: HabitType[]) => void;
  increaseStreak: (id: number) => void;
  decreaseStreak: (id: number) => void;
};

export const useHabitStore = create<HabitStoreType>((set) => ({
  habits: [],
  init: () => {
    try {
      const habits = localStorage.getItem("habits");
      if (!habits) {
        throw new Error("Daily habits not found");
      }
      set((state) => ({
        habits: JSON.parse(habits),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },
  updateOnLocalStorage: (habits: HabitType[]) => {
    set((state) => {
      localStorage.setItem("habits", JSON.stringify(habits));
      return state;
    });
  },
  get: (id: number): HabitType | undefined => {
    if (!useHabitStore.getState().habits) {
      return undefined;
    }

    return useHabitStore
      .getState()
      .habits.find((habit: HabitType) => habit.id === id);
  },
  add: (habit: HabitType) => {
    set((state) => {
      state.updateOnLocalStorage([...state.habits, habit]);
      return {
        habits: [...state.habits, habit],
      };
    });
  },
  remove: (id: number) => {
    set((state) => {
      state.updateOnLocalStorage(
        state.habits.filter((habit) => habit.id !== id)
      );
      return {
        habits: state.habits.filter((habit) => habit.id !== id),
      };
    });
  },
  update: (habit: HabitType) => {
    set((state) => {
      const habits = state.habits.map((t) => {
        if (t.id === habit.id) {
          return habit;
        }
        return t;
      });
      state.updateOnLocalStorage(habits);
      return {
        habits: habits,
      };
    });
  },
  increaseStreak: (id: number) => {
    set((state) => {
      const habits = state.habits.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            positiveStreakCount: Number(t.positiveStreakCount) + 1,
          };
        }
        return t;
      });
      state.updateOnLocalStorage(habits);
      const reward = habits.find((habit) => habit.id === id)?.reward;
      if (reward) {
        useProfileStore.getState().gainGp(Number(reward));
      }
      return {
        habits: habits,
      };
    });
  },
  decreaseStreak: (id: number) => {
    set((state) => {
      const habits = state.habits.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            negativeStreakCount: Number(t.negativeStreakCount) - 1,
          };
        }
        return t;
      });
      state.updateOnLocalStorage(habits);
      const punishment = habits.find((habit) => habit.id === id)?.punishment;
      if (punishment) {
        useProfileStore.getState().gainGp(Number(punishment));
      }
      return {
        habits: habits,
      };
    });
  },
}));
