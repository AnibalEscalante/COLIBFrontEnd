export interface User {
  _id?: string;
  name: string;
  lastName: string;
  email?: string;
  password?: string;
  movilPhone?: string;
  _idDisciplines?: string[];
  _idSkills?: string[];
  updatedAt?: Date;
  createdAt?: Date;
}