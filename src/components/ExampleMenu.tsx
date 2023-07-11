import { ThreeDotIcon } from "@/assets/ThreeDotIcon";
import { HabitType } from "@/models/HabitType";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function ExampleMenu({ habit }: { habit: HabitType }) {
  return (
    <Menu
      menuButton={
        <MenuButton>
          <ThreeDotIcon />
        </MenuButton>
      }
      transition
    >
      <MenuItem>Edit</MenuItem>
    </Menu>
  );
}
