import { LexBasicTable, LexNum, LexPhoneticTable, LexWord, VerbTimes } from "../../../interfaces/AbosTables";
import { LangKeyedString } from "../../../interfaces/General";
import { readAsObject } from "../../utils/Dependency";

export async function fetchTable(id: string) {
    switch(id)
    {
        case "f": return await readAsObject<LexPhoneticTable[]>(`abos/tables/phonetics.json`);
        case "l": return (await readAsObject<LexWord[]>(`abos/tables/lexicon.json`)).filter(w => w.word.font != '' && w.word.font != undefined)
        .sort((l1, l2) => {
            return l1.word.romanization.toLowerCase().localeCompare(l2.word.romanization.toLowerCase());
        });
        case "m": return await readAsObject<{ type: LangKeyedString[]; measures: LexBasicTable[]; }[]>(`abos/tables/phonetics.json`);
        case "n": return (await readAsObject<LexNum[]>(`abos/tables/numbers.json`))
        .sort((n1, n2) => {
            if(parseInt(n1.og, 16) > parseInt(n2.og, 16))
              return 1
        
            if(parseInt(n1.og, 16) < parseInt(n2.og, 16))
              return -1
        
            return 0;
        });
        case "t": return await readAsObject<VerbTimes[]>(`abos/tables/verb-time.json`);
        case "p": return await readAsObject<LexBasicTable[]>(`abos/tables/pronouns.json`);
        default: return await readAsObject<LexBasicTable[]>(`abos/tables/misc-grammar.json`);
    }
}