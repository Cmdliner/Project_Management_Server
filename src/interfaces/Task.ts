export interface TaskBody {
    name: string;
    description: string;
    status: 'pending' | 'completed' | 'ongoing';
    projectId: string;
    userId: string;
}