export interface ProjectFilterParams {
    userId: string;
    name?: string;
    taskCount: number;
    createdAtStart?: Date;
    createdAtEnd?: Date;
}