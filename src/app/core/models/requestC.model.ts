import { Project } from "./project.model";
import { User } from "./user.model";

export interface RequestC {
    _id?: string;
    idProject: string;
    idUserSender: string;
    state: string;
    updateAt: Date;
    createdAt: Date;
}