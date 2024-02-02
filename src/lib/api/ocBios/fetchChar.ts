import { Char } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchChar(oc: string) {
    let esChar: Char | undefined;
    try {
      esChar = await readAsObject<Char>(`oc-bios/chars/${oc}/${oc}.json`);
    } catch (error) {
      esChar = undefined;
    }

    return esChar;
  }