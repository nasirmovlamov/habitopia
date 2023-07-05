import { data } from "autoprefixer";

export class ResponseService<T> {
  data: T | null;
  message: string;
  status: number;
  errors?: {
    [key: string]: string[];
  } | null;

  constructor(
    data?: T,
    message?: string,
    status?: number,
    errors?: {
      [key: string]: string[];
    } | null
  ) {
    try {
      if (!data) {
        throw new Error("Data not found");
        return;
      }
      this.data = data;
      this.message = message || "";
      this.status = status || 200;
      return this;
    } catch (error) {
      if (error instanceof Error) {
        this.message = error.message;
      }
      this.data = null;
      this.status = status || 404;
      this.message = message || "Something went wrong";
      this.errors = errors || null;
      return this;
    }
  }
}
