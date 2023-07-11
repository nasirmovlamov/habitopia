import { RemoveIcon } from "@/assets/RemoveIcon";
import { FormInputWrapper } from "@/components/FormInputWrapper";
import { HabitType } from "@/model/HabitType";
import { useHabitStore } from "@/store/useHabitTaskStore";
import { toCapitalize } from "@/utils/toCapitalize";
import { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "react-modal";

export const HabitEditModal = ({
  habit,
  isEditModalOpen,
  closeModal,
}: {
  habit: HabitType;
  isEditModalOpen: boolean;
  closeModal: () => void;
}) => {
  const { update: updateHabit } = useHabitStore();
  const {
    register,
    handleSubmit: handleUseFormSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<HabitType, "id">>({
    defaultValues: {
      name: habit.name,
      description: habit.description,
      isNegativeActive: habit.isNegativeActive,
      isPositiveActive: habit.isPositiveActive,
      negativeStreakCount: habit.negativeStreakCount,
      positiveStreakCount: habit.positiveStreakCount,
      reward: habit.reward,
      punishment: habit.punishment,
    },
  });

  useEffect(() => {
    reset({
      name: habit.name,
      description: habit.description,
      isNegativeActive: habit.isNegativeActive,
      isPositiveActive: habit.isPositiveActive,
      negativeStreakCount: habit.negativeStreakCount,
      positiveStreakCount: habit.positiveStreakCount,
      reward: habit.reward,
      punishment: habit.punishment,
    });
  }, [habit]);

  const handleSubmit = (data: Omit<HabitType, "id">) => {
    try {
      updateHabit({ ...data, id: habit.id });
      closeModal();
      toast.success(`${toCapitalize(habit.name)} habit updated`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong");
    }
  };

  if (!habit) {
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
            label="PositiveStreakCount"
            fieldName="positiveStreakCount"
            errors={errors}
            errorMessage="PositiveStreakCount is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="NegativeStreakCount"
            fieldName="negativeStreakCount"
            errors={errors}
            errorMessage="NegativeStreakCount is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="isPositiveActive"
            fieldName="isPositiveActive"
            errors={errors}
            errorMessage="isPositiveActive is required"
            register={register}
            required
          />
          <FormInputWrapper
            label="isNegativeActive"
            fieldName="isNegativeActive"
            errors={errors}
            errorMessage="isNegativeActive is required"
            register={register}
            required
          />
          <FormInputWrapper
            label="reward"
            fieldName="reward"
            errors={errors}
            errorMessage="reward is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="punishment"
            fieldName="punishment"
            errors={errors}
            errorMessage="punishment is required"
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
