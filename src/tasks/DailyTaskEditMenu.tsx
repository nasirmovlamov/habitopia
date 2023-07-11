import { ThreeDotIcon } from "@/assets/ThreeDotIcon";
import { DailyTaskType } from "@/models/DailyTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function DailyTaskEditMenu({
  openEditModal,
  dailyTask,
}: {
  openEditModal: () => void;
  dailyTask: DailyTaskType;
}) {
  const { remove } = useDailyTaskStore();

  const handleRemove = () => {
    remove(dailyTask.id);
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
