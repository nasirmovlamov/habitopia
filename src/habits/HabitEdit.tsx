import { HabitEditModal } from "./HabitEditModal";
import HabitMenu from "./HabitEditMenu";
import HabitEditMenu from "./HabitEditMenu";
import { use, useEffect, useState } from "react";
import { HabitType } from "@/models/HabitType";

export const HabitEdit = ({ habit }: { habit: HabitType }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function openEditModal() {
    setEditModalOpen(true);
  }

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <HabitEditMenu habit={habit} openEditModal={openEditModal} />
      <HabitEditModal
        habit={habit}
        isEditModalOpen={isEditModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
