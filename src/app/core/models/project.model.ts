export interface Project {
  _id?: string;
  title: string;
  content: string;
  _idContributors: string[];
  _idDisciplines: string[];
  _idSkills: string[];
  finishedDate?: Date;
  state: string;
  updatedAt?: Date;
  createdAt?: Date;
}