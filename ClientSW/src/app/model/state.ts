import { Task } from "./task";

export interface State {
    id?: number;
    name: string;
    id_panel?: number;
    tasks?: Task[];
    new?: boolean;
}