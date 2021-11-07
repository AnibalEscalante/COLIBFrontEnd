import { Discipline } from "./discipline.model";
import { Project } from "./project.model";
import { RequestC } from "./requestC.model";
import { Skill } from "./skill.model";

export interface User {
  _id?: string;
  name: string;
  lastName: string;
  nickName: string;
  movilPhone?: string;
  idDisciplines?: Discipline[];
  idSkills?: Skill[]; //string[v] y arriba tambien
  idSavedProjects?: Project[];
  idMyProjects?: Project[] | string[];
  idRequestC?: RequestC[];
  idRequestResults?: RequestC[];
  updateAt?: Date;
  createdAt?: Date;
}