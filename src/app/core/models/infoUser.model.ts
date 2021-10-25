import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";


export interface InfoUser {
  _id?: string;
  name: string;
  lastName: string;
  movilPhone?: string;
  idDisciplines?: string[] | Discipline[];
  idSkills?: string[] | Skill[];
  updateAt?: Date;
  createdAt?: Date;
}