export interface ProjectBody {
    name: string;
    description: string;
    status: 'active' | 'on hold' | 'completed';
    dueDate: Date;
    userId: string;
}

export type ProjectUpdatable = Partial<Pick<ProjectBody, 'name' | 'description' | 'dueDate' | 'status'>>;