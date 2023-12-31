import { toCapitalize } from "@/utils/toCapitalize";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

export const FormInputWrapper = ({
  label,
  errors,
  fieldName,
  errorMessage,
  register,
  required,
  inputType,
}: {
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  fieldName: string;
  errorMessage?: string;
  required?: boolean;
  inputType?: string;
}) => {
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <label htmlFor="" className="text-sm capitalize w-full">
        {label}
      </label>
      <input
        type={inputType || "text"}
        {...register(fieldName, {
          required: required,
        })}
        className="border-2 border-gray-300 rounded-md p-2 text-black w-full"
      />
      <span className="text-red-500 text-sm w-full">
        {errors[fieldName] &&
          toCapitalize(errorMessage || `${fieldName} is required`)}
      </span>
    </div>
  );
};
