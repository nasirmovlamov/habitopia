import { RemoveIcon } from "@/assets/RemoveIcon";
import { FormInputWrapper } from "@/components/FormInputWrapper";
import { ProductType } from "@/models/ProductType";
import { useMarketStore } from "@/store/useMarket";
import { toCapitalize } from "@/utils/toCapitalize";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "react-modal";

export const ProductEditModal = ({
  product,
  isEditModalOpen,
  closeModal,
}: {
  product: ProductType;
  isEditModalOpen: boolean;
  closeModal: () => void;
}) => {
  const { update: updateProduct } = useMarketStore();
  const {
    register,
    handleSubmit: handleUseFormSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<ProductType, "id">>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    },
  });

  useEffect(() => {
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }, [product, reset]);

  const handleSubmit = (data: Omit<ProductType, "id">) => {
    try {
      updateProduct({ ...data, id: product.id });
      closeModal();
      toast.success(`${toCapitalize(product.name)} product updated`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    closeModal();
    return null;
  }

  if (!isEditModalOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={closeModal}
      className={
        "text-black flex justify-center py-[100px] h-full bg-[#0000007e] overflow-y-auto"
      }
    >
      <div className="bg-white rounded-lg p-10 h-max w-[500px]">
        <button onClick={closeModal} className="flex justify-end w-full">
          <RemoveIcon />
        </button>
        <form className="" onSubmit={handleUseFormSubmit(handleSubmit)}>
          <FormInputWrapper
            label="name"
            fieldName="name"
            errors={errors}
            errorMessage="name is required"
            register={register}
            required
          />
          <FormInputWrapper
            label="description"
            fieldName="description"
            errors={errors}
            errorMessage="description is required"
            register={register}
            required
          />
          <FormInputWrapper
            label="price"
            fieldName="price"
            errors={errors}
            errorMessage="price is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="stock"
            fieldName="stock"
            errors={errors}
            errorMessage="stock is required"
            register={register}
            required
            inputType="number"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
