export interface Task {
    id: number;
    title: string;
    location?: string;
    expirationDate: Date,
    description?: string,
    place: number,
    id_state: number
}