import { createContext } from "react";
import { TraitStatus } from "../interfaces";

export const FilterStatus = createContext<
  Record<string, Record<string, TraitStatus>>
>({});
