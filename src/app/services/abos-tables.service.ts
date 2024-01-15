import { Injectable } from '@angular/core';
import { LexNum, LexBasicTable, LexWord, VerbTimes, LexPhoneticTable } from '../interfaces/abos-tables';
import { LangKeyedString } from '../interfaces/general';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class AbosTablesService {
  constructor(private remoteJson: RemoteJsonReaderService) { }
  
  getPhonetics() {
    return this.remoteJson.get<LexPhoneticTable[]>('abos/tables/phonetics.json');
  }

  getLex() {
    return this.remoteJson.get<LexWord[]>('abos/tables/lexicon.json').then(data => {
      return data.filter(w => w.word.font != '' && w.word.font != undefined).sort((l1, l2) => {
        return l1.word.romanization.toLowerCase().localeCompare(l2.word.romanization.toLowerCase());
      })
    });
  }

  getTime() {
    return this.remoteJson.get<{ type: LangKeyedString[]; measures: LexBasicTable[]; }[]>('abos/tables/measurements.json')
  }

  getNums() {
    return this.remoteJson.get<LexNum[]>('abos/tables/numbers.json').then(data => {
      return data.sort((n1, n2) => {
        if(parseInt(n1.og, 16) > parseInt(n2.og, 16))
          return 1
    
        if(parseInt(n1.og, 16) < parseInt(n2.og, 16))
          return -1
    
        return 0;
      });
    });
  }

  getTimes() {
    return this.remoteJson.get<VerbTimes[]>('abos/tables/verb-time.json')
  }

  getPronouns() {
    return this.remoteJson.get<LexBasicTable[]>('abos/tables/pronouns.json');
  }

  getMiscGrammar() {
    return this.remoteJson.get<LexBasicTable[]>('abos/tables/misc-grammar.json');
  }
}
