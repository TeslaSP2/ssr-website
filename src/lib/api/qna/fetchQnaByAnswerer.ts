import { QnA } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchQnaByAnswerer(mainAnswerer: string, parentAnswerer?: string) {
    return (await readAsObject<QnA[]>('oc-bios/qna.json')).filter(q => q.mainAnswerer == mainAnswerer && parentAnswerer != undefined ? q.mainParent == parentAnswerer : true);
}