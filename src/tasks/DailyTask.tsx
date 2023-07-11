import { DailyTaskType } from "@/models/DailyTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import useSound from "use-sound";

export const DailyTask = ({ dailyTask }: { dailyTask: DailyTaskType }) => {
  const [play] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Daily.ogg"
  );
  const { remove: removeDailyTask, complete, uncomplete } = useDailyTaskStore();

  const completeTask = () => {
    complete(dailyTask.id);
    play();
  };
  const unCompleteTask = () => {
    uncomplete(dailyTask.id);
    play();
  };

  const handleCompletionOfTask = () => {
    if (dailyTask.hasCompleted) {
      unCompleteTask();
      return;
    }
    completeTask();
    play();
  };

  return (
    <div className="relative flex justify-between  bg-gray-100   text-black text-start">
      <div className="flex flex-col py-5 px-2">
        <input
          type="checkbox"
          onClick={handleCompletionOfTask}
          checked={dailyTask.hasCompleted}
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-col w-full py-5 ">
        <div className="text-2xl w-full">{dailyTask.name}</div>
        <div className=" w-full">{dailyTask.description}</div>
        <div className=" w-full">{dailyTask.startDate}</div>
      </div>
      {/* absolute remove button */}
      <button
        onClick={() => removeDailyTask(dailyTask.id)}
        className="absolute top-0 right-0 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-500"
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
    </div>
  );
};
