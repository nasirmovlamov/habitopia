import { DailyTaskServiceInterface } from "../interfaces/DailyTaskServiceInterface";
import { DailyTaskType } from "../model/DailyTaskType";
import { GenericResponseType } from "../model/GenericReponseType";
import { ResponseService } from "./ResponseService";

export class DailyTaskService implements DailyTaskServiceInterface {
  init(): GenericResponseType<DailyTaskType[]> {
    try {
      const tasks = localStorage.getItem("tasks");
      if (!tasks) {
        throw new Error(
          "Tasks not found, please add a task to initialize the list"
        );
      }
      return new ResponseService<DailyTaskType[]>(JSON.parse(tasks));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  add(task: DailyTaskType): GenericResponseType<DailyTaskType[]> {
    try {
      if (!task) {
        throw new Error("Task not found");
      }
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return new ResponseService<DailyTaskType[]>(
        JSON.parse(localStorage.getItem("tasks") || "[]")
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  remove(id: number): GenericResponseType<DailyTaskType[]> {
    try {
      const tasks = (
        JSON.parse(localStorage.getItem("tasks") || "[]") as DailyTaskType[]
      ).filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      return new ResponseService<DailyTaskType[]>(tasks);
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  list(): GenericResponseType<DailyTaskType[]> {
    try {
      const tasks = localStorage.getItem("tasks");
      if (!tasks) {
        throw new Error("Tasks not found");
      }
      return new ResponseService<DailyTaskType[]>(
        JSON.parse(localStorage.getItem("tasks") || "[]")
      );
    } catch (error) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  get(id: number): GenericResponseType<DailyTaskType> {
    try {
      const task = (
        JSON.parse(localStorage.getItem("tasks") || "[]") as DailyTaskType[]
      ).find((task) => task.id === id);
      if (!task) {
        throw new Error(`Task with id ${id} not found`);
      }
      return new ResponseService<DailyTaskType>(task);
    } catch (error: any) {
      if (error instanceof Error) {
        return new ResponseService(null, error.message);
      }
      return new ResponseService();
    }
  }

  set(task: DailyTaskType): GenericResponseType<DailyTaskType[]> {
    try {
      if (!task) {
        throw new Error("Task not found");
      }
      const tasks = (
        JSON.parse(localStorage.getItem("tasks") || "[]") as DailyTaskType[]
      ).map((t) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
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
