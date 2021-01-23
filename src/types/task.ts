export interface Task {
  key: string;
  status: TaskStatus;
  task: string;
}

export type TaskStatus = "open" | "inProgress" | "complete";