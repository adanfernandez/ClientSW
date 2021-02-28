import { Task } from "./task";

export interface State {
    id?: number;
    name: string;
    panelId?: number;
    place: number;
    tasks?: Task[];
    state?: number;
    new?: boolean;
}