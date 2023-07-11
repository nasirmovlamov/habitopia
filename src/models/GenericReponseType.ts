import { ErrorResponseType } from "./ErrorResponseType";

export type GenericResponseType<T> =
  | {
      data: T | null;
      status: number;
      message: string;
      errors?: {
        [key: string]: string[];
      } | null;
    }
  | ErrorResponseType;
