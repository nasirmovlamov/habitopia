import { HabitType } from "@/model/HabitType";
import { create } from "zustand";
import { useProfileStore } from "./useProfileStore";

type HabitStoreType = {
  habits: HabitType[];
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
            counter: t.counter + 1,
          };
        }
        return t;
      });
      state.updateOnLocalStorage(habits);
      const reward = habits.find((habit) => habit.id === id)?.reward;
      if (reward) {
        useProfileStore.setState((profileState) => ({
          profile: {
            ...profileState.profile,
            gp: profileState.profile.gp + reward,
          },
        }));
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
            counter: t.counter - 1,
          };
        }
        return t;
      });
      state.updateOnLocalStorage(habits);
      return {
        habits: habits,
      };
    });
  },
}));
