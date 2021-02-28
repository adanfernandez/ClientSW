import { State } from "./state";

export interface Panel {
    id?: number;
    name?: string;
    userId?: number;
    states?: State[];
    new?: boolean;
}