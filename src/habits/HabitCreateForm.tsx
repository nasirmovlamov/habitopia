import { useHabitStore } from "@/store/useHabitTaskStore";

export const CreateHabit = () => {
  const { habits, add: addHabit, init: initHabits } = useHabitStore();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addHabit({
      id: Math.floor(Math.random() * 100),
      name: e.target.task.value,
      description: "test",
      startDate: new Date().toISOString(),
      positiveStreakCount: 0,
      negativeStreakCount: 0,
      isNegativeActive: true,
      isPositiveActive: true,
      reward: 5,
      punishment: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full  mt-5">
      <input
        name="task"
        type="text"
        placeholder="Add a Habit"
        className="w-full border-2 border-gray-300 rounded-md p-2 text-black"
      />
    </form>
  );
};
