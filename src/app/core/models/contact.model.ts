import { Message } from "./message.model";

export interface Contact {
  _id?: string;
  nickName: string;
  idUser: string;
  idSentMessages?: Message[] | string[];
  idRecievedMessages?: Message[] | string[];
  updateAt?: Date;
  createdAt?: Date;
}