import { HabitServiceInterface } from "../interfaces/HabitServiceInterface";
import { GenericResponseType } from "../model/GenericReponseType";
import { HabitType } from "../model/HabitType";
import { ResponseService } from "./ResponseService";
import { DailyTaskType } from "@/model/DailyTaskType";

export class HabitService implements HabitServiceInterface {
  // initialize habits from localStorage
  init(): GenericResponseType<HabitType[]> {
    try {
      const habits = localStorage.getItem("habits");
      if (!habits) {
        throw new Error("Habits not found");
      }
      return new ResponseService<HabitType[]>(JSON.parse(habits));
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  // add habit to localStorage
  add(habit: HabitType): GenericResponseType<HabitType[]> {
    try {
      if (!habit) {
        throw new Error("Habit not found");
      }
      const habits = JSON.parse(localStorage.getItem("habits") || "[]");
      habits.push(habit);
      localStorage.setItem("habits", JSON.stringify(habits));
      return new ResponseService<HabitType[]>(habits);
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  remove(id: number): GenericResponseType<HabitType[]> {
    try {
      const habits = (
        JSON.parse(localStorage.getItem("habits") || "[]") as HabitType[]
      ).filter((habit) => habit.id !== id);
      if (!habits) {
        throw new Error(`Habit with id ${id} not found`);
      }
      localStorage.setItem("habits", JSON.stringify(habits));
      return new ResponseService<HabitType[]>(habits);
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  list(): GenericResponseType<HabitType[]> {
    try {
      const habits = localStorage.getItem("habits");
      if (!habits) {
        throw new Error("Habits not found");
      }
      return new ResponseService<HabitType[]>(JSON.parse(habits));
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  get(id: number): GenericResponseType<HabitType> {
    try {
      const habit = (
        JSON.parse(localStorage.getItem("habits") || "[]") as HabitType[]
      ).find((habit) => habit.id === id);
      if (!habit) {
        throw new Error(`Habit with id ${id} not found`);
      }
      return new ResponseService<HabitType>(habit);
    } catch (error: any) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  set(habit: HabitType): GenericResponseType<HabitType[]> {
    try {
      if (!habit) {
        throw new Error("Habit not found");
      }
      const tasks = (
        JSON.parse(localStorage.getItem("habits") || "[]") as HabitType[]
      ).map((h) => {
        if (h.id === habit.id) {
          return habit;
        }
        return h;
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return new ResponseService<DailyTaskType[]>(tasks);
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }
}
