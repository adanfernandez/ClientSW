import { State } from "./state";

export interface Panel {
    id?: number;
    name?: string;
    id_user?: number;
    states?: State[];
    new?: boolean;
}