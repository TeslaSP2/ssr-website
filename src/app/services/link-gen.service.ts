import { Injectable } from '@angular/core';
import { OutLink } from '../interfaces/general';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class LinkGenService {

  constructor(private remoteJson: RemoteJsonReaderService) { }

  getLinks()
  {
    return this.remoteJson.get<OutLink[]>('links-gen.json');
  }
}
