import { DailyTaskType } from "@/model/DailyTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";

export const DailyTask = ({ dailyTask }: { dailyTask: DailyTaskType }) => {
  const { remove: removeDailyTask } = useDailyTaskStore();

  return (
    <div className="relative flex justify-between  bg-gray-100   text-black text-start">
      <div className="flex flex-col w-full p-5">
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
