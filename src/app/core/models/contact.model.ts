import { Message } from "./message.model";

export interface Contact {
  _id?: string;
  nickName: string;
  idUser: string;
  idSentMessages?: Message[];
  idRecievedMessages?: Message[];
  updateAt?: Date;
  createdAt?: Date;
}