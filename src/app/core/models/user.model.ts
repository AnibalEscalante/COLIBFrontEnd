import { Discipline } from "./discipline.model";
import { Project } from "./project.model";
import { RequestC } from "./requestC.model";
import { Skill } from "./skill.model";

export interface User {
  _id?: string;
  name: string;
  lastName: string;
  movilPhone?: string;
  idDisciplines?: string[] | Discipline[];
  idSkills?: Skill[];
  idSavedProjects?: Project[];
  idMyProjects?: Project[] | string[];
  idRequestC?: RequestC[];
  idRequestResults?: RequestC[];
  updateAt?: Date;
  createdAt?: Date;
}