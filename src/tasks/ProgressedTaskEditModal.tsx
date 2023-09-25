import { RemoveIcon } from "@/assets/RemoveIcon";
import { FormInputWrapper } from "@/components/FormInputWrapper";
import { DailyTaskType } from "@/models/DailyTaskType";
import { ProgressedTaskType } from "@/models/ProgressedTaskType";
import { useDailyTaskStore } from "@/store/useDailyTaskStore";
import { useProgressedTaskStore } from "@/store/useProgressedTaskStore";
import { toCapitalize } from "@/utils/toCapitalize";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "react-modal";

export const ProgressedTaskEditModal = ({
  progressedTask,
  isEditModalOpen,
  closeModal,
}: {
  progressedTask: ProgressedTaskType;
  isEditModalOpen: boolean;
  closeModal: () => void;
}) => {
  const { update } = useProgressedTaskStore();
  const {
    register,
    handleSubmit: handleUseFormSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<ProgressedTaskType, "id" | "startDate" | "updatedAt">>({
    defaultValues: {
      name: progressedTask.name,
      description: progressedTask.description,
      reward: progressedTask.reward,
      hasCompleted: false,
    },
  });

  useEffect(() => {
    reset({
      name: progressedTask.name,
      description: progressedTask.description,
      reward: progressedTask.reward,
      hasCompleted: progressedTask.hasCompleted,
      progress: progressedTask.progress,
      limit: progressedTask.limit,
      urgency: progressedTask.urgency,
      importancy: progressedTask.importancy,
      dueDate: progressedTask.dueDate,
    });
  }, []);

  const handleSubmit = (
    data: Omit<ProgressedTaskType, "id" | "startDate" | "updatedAt">
  ) => {
    try {
      update({ ...data, id: progressedTask.id });
      closeModal();
      toast.success(`${toCapitalize(progressedTask.name)} daily task updated`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("Something went wrong");
    }
  };

  if (!progressedTask) {
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
            label="progress"
            fieldName="progress"
            errors={errors}
            errorMessage="progress is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="limit"
            fieldName="limit"
            errors={errors}
            errorMessage="limit is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="urgency"
            fieldName="urgency"
            errors={errors}
            errorMessage="urgency is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="importancy"
            fieldName="importancy"
            errors={errors}
            errorMessage="importancy is required"
            register={register}
            required
            inputType="number"
          />
          <FormInputWrapper
            label="dueDate"
            fieldName="dueDate"
            errors={errors}
            errorMessage="dueDate is required"
            register={register}
            required
            inputType="date"
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
