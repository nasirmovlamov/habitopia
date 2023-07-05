import { GenericResponseType } from "../model/GenericReponseType";

export interface BaseServiceInterface<T> {
  init(): GenericResponseType<T[]>;
  add(item: T): GenericResponseType<T[]>;
  list(): GenericResponseType<T[]>;
  get(id: number): GenericResponseType<T>;
  set(item: T): GenericResponseType<T[]>;
  // Add any other common methods or properties here
}
