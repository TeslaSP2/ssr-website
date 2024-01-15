import { Injectable } from '@angular/core';
import { DiaryNote } from '../interfaces/diary-note';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryNotesService {

  constructor (private remoteJson: RemoteJsonReaderService) {}

  get() {
    return this.remoteJson.get<DiaryNote[]>("diary/diary-entries.json")
  }
}
