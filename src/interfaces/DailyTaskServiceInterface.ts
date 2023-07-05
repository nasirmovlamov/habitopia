import { DailyTaskType } from "../model/DailyTaskType";
import { GenericResponseType } from "../model/GenericReponseType";
import { BaseServiceInterface } from "./BaseServiceInterface";

export interface DailyTaskServiceInterface {
  init(): GenericResponseType<DailyTaskType[]>;
  add(task: DailyTaskType): GenericResponseType<DailyTaskType[]>;
  list(): GenericResponseType<DailyTaskType[]>;
  get(id: number): GenericResponseType<DailyTaskType>;
  set(task: DailyTaskType): GenericResponseType<DailyTaskType[]>;
  remove(id: number): GenericResponseType<DailyTaskType[]>;
}
