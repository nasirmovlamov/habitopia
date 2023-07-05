import { HabitType } from "@/model/HabitType";
import { GenericResponseType } from "../model/GenericReponseType";
import { BaseServiceInterface } from "./BaseServiceInterface";

export interface HabitServiceInterface extends BaseServiceInterface<HabitType> {
  init(): GenericResponseType<HabitType[]>;
  add(habit: HabitType): GenericResponseType<HabitType[]>;
  remove(id: number): GenericResponseType<HabitType[]>;
  list(): GenericResponseType<HabitType[]>;
  get(id: number): GenericResponseType<HabitType>;
  set(habit: HabitType): GenericResponseType<HabitType[]>;
}
