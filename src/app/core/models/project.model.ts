import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";
import { User } from "./user.model";

export interface Project {
  _id?: string;
  title: string;
  content: string;
  _idContributors: string[];
  _idDisciplines: string[];
  _idSkills: string[];
  finishedDate?: Date;
  collaborators: User[];
  disciplines: Discipline[];
  skills?: Skill[];
  state: string;
  updatedAt?: Date;
  createdAt?: Date;
}