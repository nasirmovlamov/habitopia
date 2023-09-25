import { useProgressedTaskStore } from "@/store/useProgressedTaskStore";
import { ProgressedTaskType } from "@/models/ProgressedTaskType";
import { ProgressedTaskEdit } from "./ProgressedTaskEdit";
import useSound from "use-sound";

export const ProgressedTask = ({
  progressedTask,
}: {
  progressedTask: ProgressedTaskType;
}) => {
  const [playTaskComplete] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Todo.ogg"
  );
  const {
    remove: removeProgressedTask,
    complete,
    uncomplete,
  } = useProgressedTaskStore();

  const completeTask = () => {
    complete(progressedTask.id);
    playTaskComplete();
  };

  const unCompleteTask = () => {
    uncomplete(progressedTask.id);
    playTaskComplete();
  };

  const handleCompletionOfTask = () => {
    if (progressedTask.hasCompleted) {
      unCompleteTask();
      return;
    }
    completeTask();
    playTaskComplete();
  };

  const progress = parseInt(
    ((progressedTask.progress / progressedTask.limit) * 100).toFixed(2)
  );

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
          checked={progressedTask.hasCompleted}
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-col w-full p-5 relative">
        <div className="flex justify-end gap-3 absolute right-1 top-2">
          <ProgressedTaskEdit progressedTask={progressedTask} />
        </div>
        <div className="text-2xl w-full">{progressedTask.name}</div>
        <div className=" w-full">{progressedTask.description}</div>
        <div className=" w-full flex flex-wrap mt-2 gap-1">
          {/* tags */}
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-xs mr-2">
            achieved {progressedTask.progress} min
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-xs mr-2">
            planned {progressedTask.limit} min
          </span>
          <div className="w-full"></div>
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-xs mr-2">
            importancy {progressedTask.importancy}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-xs mr-2">
            urgency {progressedTask.urgency}
          </span>
        </div>
        <div className="text-[9px] w-full text-gray-400 text-end">
          Started /{" "}
          {new Date(progressedTask.startDate).toLocaleDateString("en-US", {
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
          {new Date(progressedTask.updatedAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
        </div>
        {/* progress line */}
        <div className="bg-black h-4 rounded-lg w-full  mt-4">
          <div
            className={`bg-green-400 h-4 rounded-lg `}
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
