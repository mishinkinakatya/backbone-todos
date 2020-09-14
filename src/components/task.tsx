export interface Task {
    id: number,
    description: string,
    status: TaskStatus,
}

export enum TaskStatus {
    Completed,
    Uncompleted
}

