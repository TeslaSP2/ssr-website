import { Injectable } from '@angular/core';

declare const Zone: any;

@Injectable({
  providedIn: 'root'
})
export class RemoteJsonReaderService {

  constructor() { }

  async get<T>(path: string) {
    return await (await fetch('https://files.teslasp2.com/assets/jsons/'+path)).json() as T;
  }
}
