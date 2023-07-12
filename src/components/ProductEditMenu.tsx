import { ThreeDotIcon } from "@/assets/ThreeDotIcon";
import { ProductType } from "@/models/ProductType";
import { useMarketStore } from "@/store/useMarket";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function ProductEditMenu({
  openEditModal,
  product,
}: {
  openEditModal: () => void;
  product: ProductType;
}) {
  const { remove: removeProduct } = useMarketStore();

  const handleRemoveProduct = () => {
    removeProduct(product.id);
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
      <MenuItem onClick={handleRemoveProduct}>Remove</MenuItem>
    </Menu>
  );
}
