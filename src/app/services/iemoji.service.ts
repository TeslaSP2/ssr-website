import { Injectable } from '@angular/core';
import { RemoteJsonReaderService } from './remote-json-reader.service';
import { Iemoji } from '../interfaces/iemoji';

@Injectable({
  providedIn: 'root'
})
export class IemojiService {

  constructor(private remoteJson: RemoteJsonReaderService) { }

  async getEmoji(emoji: string) {
    return (await this.remoteJson.get<Iemoji[]>('iemojis.json')).filter(e => e.emoji == emoji).firstOrDefault();
  }
}
