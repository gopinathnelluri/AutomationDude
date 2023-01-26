import { Runner } from "./runner";
import { Rpa } from "./rpa";

export interface Config {
    runners?: Runner[],
    rpas?: Rpa[]
}