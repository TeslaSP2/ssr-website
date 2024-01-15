import { Injectable } from '@angular/core';
import { QnA } from '../interfaces/id';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class QnaService {

  constructor(private remoteJson: RemoteJsonReaderService) { }

  get(id?: string)
  {
    if(id == undefined)
      return this.remoteJson.get<QnA[]>('oc-bios/qna.json');
    else
      return this.remoteJson.get<QnA[]>('oc-bios/qna.json').then(data => {
        return data.filter(q => q.id == id).firstOrDefault();
    })
  }

  getByMainAnswerer(mainAnswerer: string, parentAnswerer?: string)
  {
    return this.remoteJson.get<QnA[]>('oc-bios/qna.json').then(data => {return data.filter(q => q.mainAnswerer == mainAnswerer && parentAnswerer != undefined ? q.mainParent == parentAnswerer : true);})
  }
}
