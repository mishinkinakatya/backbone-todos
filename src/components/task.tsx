export interface Task {
    id: number,
    task: string,
    status: TaskStatus,
}

export enum TaskStatus {
    Completed,
    Uncompleted
}
