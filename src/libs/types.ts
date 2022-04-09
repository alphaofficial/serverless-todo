export enum TodoStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export default interface ITodo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}
