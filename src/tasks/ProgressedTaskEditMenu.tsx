import { ThreeDotIcon } from "@/assets/ThreeDotIcon";
import { DailyTaskType } from "@/models/DailyTaskType";
import { ProgressedTaskType } from "@/models/ProgressedTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import { useProgressedTaskStore } from "@/store/useProgressedTaskStore";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function ProgressedTaskEditMenu({
  openEditModal,
  progressedTask,
}: {
  openEditModal: () => void;
  progressedTask: ProgressedTaskType;
}) {
  const { remove } = useProgressedTaskStore();

  const handleRemove = () => {
    remove(progressedTask.id);
  };
  return (
    <Menu
      menuButton={
        <MenuButton>
          <ThreeDotIcon />
        </MenuButton>
      }
      transition
    >
      <MenuItem onClick={openEditModal}>Edit</MenuItem>
      <MenuItem onClick={handleRemove}>Remove</MenuItem>
    </Menu>
  );
}
