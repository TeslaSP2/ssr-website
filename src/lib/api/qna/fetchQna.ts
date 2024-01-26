import { QnA } from "../../../interfaces/Id";
import { read } from "../../utils/Dependency";

export async function fetchQna(id?: string) {
    if(id == undefined)
      return await read<QnA[]>('oc-bios/qna.json');
    else
      return (await read<QnA[]>('oc-bios/qna.json')).filter(q => q.id == id).firstOrDefault();
}