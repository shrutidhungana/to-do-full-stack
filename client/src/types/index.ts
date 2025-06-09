export type Todo = {
  _id: string;
  name: string;
  shortDescription: string;
  dateTime: string; // ISO string
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
};