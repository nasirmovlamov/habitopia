import { useState } from "react";
import { ProductType } from "@/models/ProductType";
import { ProductEditModal } from "./ProductEditModal";
import ProductEditMenu from "./ProductEditMenu";

export const ProductEdit = ({ product }: { product: ProductType }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function openEditModal() {
    setEditModalOpen(true);
  }

  function closeModal() {
    setEditModalOpen(false);
  }

  return (
    <>
      <ProductEditMenu product={product} openEditModal={openEditModal} />
      <ProductEditModal
        product={product}
        isEditModalOpen={isEditModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};
