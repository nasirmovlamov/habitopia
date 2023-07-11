import { useState } from "react";
import DailyTaskEditMenu from "./DailyTaskEditMenu";
import { DailyTaskEditModal } from "./DailyTaskEditModal";
import { DailyTaskType } from "@/models/DailyTaskType";

export const DailyTaskEdit = ({ dailyTask }: { dailyTask: DailyTaskType }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function openEditModal() {
    setEditModalOpen(true);
  }

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <DailyTaskEditMenu dailyTask={dailyTask} openEditModal={openEditModal} />
      <DailyTaskEditModal
        dailyTask={dailyTask}
        isEditModalOpen={isEditModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
