import { ThreeDotIcon } from "@/assets/ThreeDotIcon";
import { HabitType } from "@/model/HabitType";
import { useHabitStore } from "@/store/useHabitTaskStore";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function HabitEditMenu({
  openEditModal,
  habit,
}: {
  openEditModal: () => void;
  habit: HabitType;
}) {
  const { remove: removeHabit } = useHabitStore();

  const handleRemoveHabit = () => {
    removeHabit(habit.id);
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
      <MenuItem onClick={handleRemoveHabit}>Remove</MenuItem>
    </Menu>
  );
}
