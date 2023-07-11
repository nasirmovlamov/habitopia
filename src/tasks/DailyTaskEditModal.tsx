import { RemoveIcon } from "@/assets/RemoveIcon";
import { FormInputWrapper } from "@/components/FormInputWrapper";
import { DailyTaskType } from "@/models/DailyTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import { toCapitalize } from "@/utils/toCapitalize";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "react-modal";

export const DailyTaskEditModal = ({
  dailyTask,
  isEditModalOpen,
  closeModal,
}: {
  dailyTask: DailyTaskType;
  isEditModalOpen: boolean;
  closeModal: () => void;
}) => {
  const { update } = useDailyTaskStore();
  const {
    register,
    handleSubmit: handleUseFormSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<DailyTaskType, "id" | "startDate" | "updatedAt">>({
    defaultValues: {
      name: dailyTask.name,
      description: dailyTask.description,
      reward: dailyTask.reward,
      hasCompleted: false,
    },
  });

  useEffect(() => {
    reset({
      name: dailyTask.name,
      description: dailyTask.description,
      reward: dailyTask.reward,
      hasCompleted: dailyTask.hasCompleted,
    });
  }, [dailyTask, reset]);

  const handleSubmit = (
    data: Omit<DailyTaskType, "id" | "startDate" | "updatedAt">
  ) => {
    try {
      update({ ...data, id: dailyTask.id });
      closeModal();
      toast.success(`${toCapitalize(dailyTask.name)} daily task updated`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong");
    }
  };

  if (!dailyTask) {
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
            label="reward"
            fieldName="reward"
            errors={errors}
            errorMessage="reward is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="hasCompleted"
            fieldName="hasCompleted"
            errors={errors}
            errorMessage="hasCompleted is required"
            register={register}
            required={false}
            inputType="checkbox"
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
