import { useHabitStore } from "@/store/useHabitTaskStore";
import { useEffect } from "react";

export const InitHabits = () => {
  const { init: initHabits } = useHabitStore();

  useEffect(() => {
    initHabits();
  }, []);

  return <></>;
};
