import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class MusicRepoService {
  
  constructor(private remoteJson: RemoteJsonReaderService) {
  }

  getSong(...id: string[])
  {
    return this.remoteJson.get<Song[]>('songs.json').then(data => {return data.filter(x=> id.includes(x.id))});
  }
}
