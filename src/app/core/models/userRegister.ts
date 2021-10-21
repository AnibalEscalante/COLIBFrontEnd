import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";

export interface UserRegister {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  movilPhone?: string | number;
  idDisciplines?: string[] | Discipline[];
  idSkills?: string[] | Skill[];
  password: string;
  authenticated?: string;
  entity?: string;
  token?: string;
  updatedAt?: Date;
  createdAt?: Date;
};