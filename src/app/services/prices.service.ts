import { Injectable } from '@angular/core';
import { PricesTable } from '../interfaces/prices-table';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private remoteJson: RemoteJsonReaderService) { }

  getPriceTable(table: string) {
    return this.remoteJson.get<PricesTable>("prices/"+table+".json");
  }
}
