export interface ProjectBody {
    name: string;
    description: string;
    dueDate: string;
    userId: string;
}

export type ProjectUpdatable = Partial<Pick<ProjectBody, 'name' | 'description' | 'dueDate'>>;