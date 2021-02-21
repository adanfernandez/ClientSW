export interface Task {
    id: number;
    title: string;
    location?: string;
    expirationDate: Date,
    description?: string,
    id_state: number

}