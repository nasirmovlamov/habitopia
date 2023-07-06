import { useHabitService } from "@/hooks/useHabitsHook";
import { HabitType } from "@/model/HabitType";
import { useHabitStore } from "@/store/useHabitTaskStore";

export const Habit = ({ habit }: { habit: HabitType }) => {
  const {
    increaseStreak: increaseCounter,
    decreaseStreak: decreaseCounter,
    remove: removeHabit,
  } = useHabitStore();
  return (
    <div className="relative flex justify-between  bg-gray-100   text-black text-start">
      <button
        onClick={() => removeHabit(habit.id)}
        className="absolute top-0 right-0 p-2 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <button
        onClick={() => increaseCounter(habit.id)}
        className="bg-green-500 p-3 text-white grid place-items-center"
      >
        +
      </button>
      <div className="flex flex-col w-full p-5">
        <div className="text-2xl w-full">{habit.name}</div>
        <div className=" w-full">{habit.description}</div>
        <div className=" w-full">{habit.startDate}</div>
        <div className=" w-full">{habit.counter}</div>
      </div>
      <button
        onClick={() => decreaseCounter(habit.id)}
        className="bg-red-500  p-3 text-white  grid place-items-center"
      >
        -
      </button>
    </div>
  );
};
