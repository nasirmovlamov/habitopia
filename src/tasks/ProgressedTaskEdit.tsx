import { useState } from "react";
import DailyTaskEditMenu from "./DailyTaskEditMenu";
import { DailyTaskEditModal } from "./DailyTaskEditModal";
import { DailyTaskType } from "@/models/DailyTaskType";
import { ProgressedTaskType } from "@/models/ProgressedTaskType";
import ProgressedTaskEditMenu from "./ProgressedTaskEditMenu";
import { ProgressedTaskEditModal } from "./ProgressedTaskEditModal";

export const ProgressedTaskEdit = ({
  progressedTask,
}: {
  progressedTask: ProgressedTaskType;
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function openEditModal() {
    setEditModalOpen(true);
  }

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <ProgressedTaskEditMenu
        progressedTask={progressedTask}
        openEditModal={openEditModal}
      />
      <ProgressedTaskEditModal
        progressedTask={progressedTask}
        isEditModalOpen={isEditModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
