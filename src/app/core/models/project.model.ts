import { Collaborator } from "./collaborator.model";
import { Contact } from "./contact.model";
import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";
import { User } from "./user.model";

export interface Project {
  _id?: string;
  title: string;
  content: string;
  state: string;
  finishDate?: Date;
  idUser: string;
  idSkills: Skill[];
  idDisciplines: Discipline[];
  idCollaborators: Contact[];
  updatedAt?: Date;
  createdAt?: Date;
}