import { LexBasicTable, LexNum, LexPhoneticTable, LexWord, VerbTimes } from "../../../interfaces/AbosTables";
import { LangKeyedString } from "../../../interfaces/General";

export async function fetchTable(id: string) {
    switch(id)
    {
        case "f": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/phonetics.json`)).json()) as LexPhoneticTable[]);
        case "l": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/lexicon.json`)).json()) as LexWord[]).filter(w => w.word.font != '' && w.word.font != undefined)
        .sort((l1, l2) => {
            return l1.word.romanization.toLowerCase().localeCompare(l2.word.romanization.toLowerCase());
        });
        case "m": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/measurements.json`)).json()) as { type: LangKeyedString[]; measures: LexBasicTable[]; }[]);
        case "n": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/numbers.json`)).json()) as LexNum[])
        .sort((n1, n2) => {
            if(parseInt(n1.og, 16) > parseInt(n2.og, 16))
              return 1
        
            if(parseInt(n1.og, 16) < parseInt(n2.og, 16))
              return -1
        
            return 0;
        });
        case "t": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/verb-time.json`)).json()) as VerbTimes[]);
        case "p": return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/pronouns.json`)).json()) as LexBasicTable[]);
        default: return ((await (await fetch(`https://files.teslasp2.com/assets/jsons/abos/tables/misc-grammar.json`)).json()) as LexBasicTable[]);
    }
}