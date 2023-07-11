import { MeterIcon } from "@/assets/MeterIcon";
import { RemoveIcon } from "@/assets/RemoveIcon";
import ExampleMenu from "@/components/ExampleMenu";
import { useHabitStore } from "@/store/useHabitTaskStore";

import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

import useSound from "use-sound";
import { HabitEdit } from "./HabitEdit";
import { HabitType } from "@/models/HabitType";
import { PositiveIcon } from "@/assets/PositiveIcon";
import { NegativeIcon } from "@/assets/NegativeIcon";

export const Habit = ({ habit }: { habit: HabitType }) => {
  const [playIncreaseSound] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Plus_Habit.ogg"
  );
  const [playDecreaseSound] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Minus_Habit.ogg"
  );
  const {
    increaseStreak: increaseCounter,
    decreaseStreak: decreaseCounter,
    remove: removeHabit,
    update: updateHabit,
  } = useHabitStore();

  const handleIncrease = () => {
    increaseCounter(habit.id);
    playIncreaseSound();
  };

  const handleDecrease = () => {
    decreaseCounter(habit.id);
    playDecreaseSound();
  };

  return (
    <div className="relative flex justify-between  bg-gray-100   text-black text-start rounded-lg min-h-[120px] box-border">
      <button
        onClick={handleIncrease}
        className="bg-green-500 p-3 text-white grid place-items-center w-[30px]"
        style={{
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      >
        {/* circle for positive icon */}
        <div className="w-3 h-3 bg-white rounded-full">
          <PositiveIcon />
        </div>
      </button>
      <div className="flex flex-col w-full p-5 relative">
        <div className="flex justify-end gap-3 absolute right-0 top-0">
          <HabitEdit habit={habit} />
        </div>
        <div className="text-2xl w-full">{habit.name}</div>
        <div className=" w-full">{habit.description}</div>
        <div className=" w-full flex justify-end gap-1 text-gray-400 text-xs items-center">
          <MeterIcon />
          <span>{habit.positiveStreakCount}</span>
          <span>|</span>
          <span>{habit.negativeStreakCount}</span>
        </div>
      </div>
      <button
        onClick={handleDecrease}
        className="bg-red-500 text-white p-3   grid place-items-center w-[30px]"
        style={{
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full">
          <NegativeIcon />
        </div>
      </button>
    </div>
  );
};
