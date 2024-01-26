import { QnA } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchQnaByAnswerer(mainAnswerer: string, parentAnswerer?: string) {
    return (await read<QnA[]>('oc-bios/qna.json')).filter(q => q.mainAnswerer == mainAnswerer && parentAnswerer != undefined ? q.mainParent == parentAnswerer : true);
}