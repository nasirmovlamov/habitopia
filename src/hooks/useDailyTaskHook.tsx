"use client";

import { DailyTaskType } from "@/model/DailyTaskType";
import { GenericResponseType } from "@/model/GenericReponseType";
import { DailyTaskService } from "@/services/DailyTaskService";
import { ResponseService } from "@/services/ResponseService";
import { useState, useEffect } from "react";

type DailyTaskResponse = ResponseService<DailyTaskType[]>;
type SingleDailyTaskResponse = ResponseService<DailyTaskType>;

export const useDailyTaskService = (): {
  tasks: DailyTaskType[];
  loading: boolean;
  errors: {
    [key: string]: string[];
  } | null;
  initTasks: () => void;
  addTask: (task: DailyTaskType) => void;
  getTasks: () => void;
} => {
  const [tasks, setTasks] = useState<DailyTaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key: string]: string[];
  } | null>(null);
  const dailyTaskService = new DailyTaskService();

  const initTasks = (): void => {
    setLoading(true);
    try {
      const response = dailyTaskService.init();
      if (response.data) {
        setTasks(response.data);
        setErrors(null);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
      }

      setLoading(false);
    } catch (error) {}
  };

  const addTask = (task: DailyTaskType): void => {
    setLoading(true);
    const response: GenericResponseType<DailyTaskType[]> =
      dailyTaskService.add(task);
    console.log(response);
    if (response.data) {
      console.log(response.data);
      setTasks(response.data);
      setErrors(null);
    } else {
      if (response.errors) {
        setErrors(response.errors);
      }
    }
    setLoading(false);
  };

  const getTasks = (): void => {
    setLoading(true);
    const response: GenericResponseType<DailyTaskType[]> =
      dailyTaskService.list();

    if (response.data) {
      setTasks(response.data);
      setErrors(null);
    } else {
      if (response.errors) {
        setErrors(response.errors);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    initTasks();
  }, []);

  return {
    tasks,
    loading,
    errors,
    initTasks,
    addTask,
    getTasks,
  };
};
