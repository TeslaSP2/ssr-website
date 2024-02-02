import { QnA } from "../../../interfaces/Id";
import { readAsObject } from "../../utils/Dependency";

export async function fetchQna(id?: string) {
    if(id == undefined)
      return await readAsObject<QnA[]>('oc-bios/qna.json');
    else
      return (await readAsObject<QnA[]>('oc-bios/qna.json')).filter(q => q.id == id).firstOrDefault();
}