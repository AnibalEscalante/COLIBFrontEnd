import { Collaborator } from "./collaborator.model";
import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";

export interface Project {
  _id?: string;
  title: string;
  content: string;
  state: string;
  finishDate?: Date;
  idUser: string;
  idSkills: Skill[];
  idDisciplines: Discipline[];
  idCollaborators: Collaborator[];
  updatedAt?: Date;
  createdAt?: Date;
}