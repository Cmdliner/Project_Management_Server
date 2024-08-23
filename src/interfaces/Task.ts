export interface TaskBody {
    name: string;
    description: string;
    status: 'pending' | 'completed' | 'ongoing';
    projectId: string;
    userId: string;
}

export type TaskUpdatable = Partial<Pick<TaskBody, 'name' | 'description' | 'status'>>