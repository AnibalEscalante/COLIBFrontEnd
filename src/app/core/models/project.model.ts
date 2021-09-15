import { Discipline } from "./discipline.model";
import { Skill } from "./skill.model";
import { User } from "./user.model";

export interface Project {
  _id?: string;
  title: string;
  content: string;
  finishedDate?: string;
  collaborators: User[];
  disciplines: Discipline[];
  skills?: Skill[];
  state: string;
  updatedAt?: Date;
  createdAt?: Date;
}