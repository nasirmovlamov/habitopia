"use client";

import { GenericResponseType } from "@/model/GenericReponseType";
import { HabitType } from "@/model/HabitType";
import { HabitService } from "@/services/HabitService";
import { ResponseService } from "@/services/ResponseService";
import { useState, useEffect } from "react";

type HabitResponse = ResponseService<HabitType[]>;
type SingleHabitResponse = ResponseService<HabitType>;

export const useHabitService = (): {
  habits: HabitType[];
  loading: boolean;
  errors: {
    [key: string]: string[];
  } | null;
  initHabits: () => void;
  addHabit: (habit: HabitType) => void;
  getHabits: () => void;
} => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    [key: string]: string[];
  } | null>(null);
  const habitService = new HabitService();

  const initHabits = (): void => {
    setLoading(true);
    try {
      const response = habitService.init();
      if (response.data) {
        setHabits(response.data);
        setErrors(null);
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
      }

      setLoading(false);
    } catch (error) {}
  };

  const addHabit = (habit: HabitType): void => {
    setLoading(true);
    const response: GenericResponseType<HabitType[]> = habitService.add(habit);
    console.log(response);
    if (response.data) {
      console.log(response.data);
      setHabits(response.data);
      setErrors(null);
    } else {
      if (response.errors) {
        setErrors(response.errors);
      }
    }
    setLoading(false);
  };

  const getHabits = (): void => {
    setLoading(true);
    const response: GenericResponseType<HabitType[]> = habitService.list();

    if (response.data) {
      setHabits(response.data);
      setErrors(null);
    } else {
      if (response.errors) {
        setErrors(response.errors);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    initHabits();
  }, []);

  return {
    habits,
    loading,
    errors,
    initHabits,
    addHabit,
    getHabits,
  };
};
