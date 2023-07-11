import { DailyTaskType } from "@/models/DailyTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import useSound from "use-sound";
import { DailyTaskEdit } from "./DailyTaskEdit";

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
    <div className="relative flex justify-between  bg-gray-100 text-black text-start rounded-lg min-h-[120px] box-border">
      <div
        className="flex flex-col py-5 px-2 bg-orange-400"
        style={{
          borderTopLeftRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
        }}
      >
        <input
          type="checkbox"
          onClick={handleCompletionOfTask}
          checked={dailyTask.hasCompleted}
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-col w-full p-5 relative">
        <div className="flex justify-end gap-3 absolute right-1 top-2">
          <DailyTaskEdit dailyTask={dailyTask} />
        </div>
        <div className="text-2xl w-full">{dailyTask.name}</div>
        <div className=" w-full">{dailyTask.description}</div>
        <div className="text-[9px] w-full text-gray-400 text-end">
          Started /{" "}
          {new Date(dailyTask.startDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
        </div>
        {/* updated at with gray and nice text */}
        <div className="text-[9px] w-full text-gray-400 text-end">
          Last Updated /{" "}
          {new Date(dailyTask.updatedAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};
