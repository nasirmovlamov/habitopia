export type ErrorResponseType = {
  data: null;
  status: number;
  message: string;
  errors?: {
    [key: string]: string[];
  } | null;
};
