import { Injectable } from '@angular/core';
import { FilesAbos } from '../interfaces/files-abos';
import { RemoteJsonReaderService } from './remote-json-reader.service';

@Injectable({
  providedIn: 'root'
})
export class AbosFilesService {
  private files: {Id:string; File:FilesAbos}[] = [];

  constructor(private remoteJson: RemoteJsonReaderService) {
    remoteJson.get<{ Id: string }[]>('abos/abos-files.json').then(async filesRef => {
      for(const fileRef of filesRef)
      { 
        this.files.push({Id: fileRef.Id, File: await remoteJson.get<FilesAbos>("abos/files/"+fileRef.Id+".json")});
      }

    })
  }

  public getFolders(parent: string = "/")
  {
    const files = this.files.filter(f => f.File.Folder.startsWith(parent) && f.File.Date.toDate('d-m-y') <= new Date())
    let temp: string[] = [];
    for(const file of files)
    {
      const pathNoParent = file.File.Folder.replace(parent, '');
      const pathClean = pathNoParent.includes('/') ? pathNoParent.substring(0, pathNoParent.indexOf('/')) : pathNoParent;
      if(!temp.includes(pathClean))
        temp.push(pathClean);
    }

    return temp;
  }

  public getDatesLocked()
  {
    let locked = this.files.filter(f => f.File.Date.toDate('d-m-y') > new Date()).sort((a, b) => {
      if(a.File.Date == undefined)
        return 0;
      
      if(b.File.Date == undefined)
        return 0;

      if(a.File.Date.toDate('d-m-y') > b.File.Date.toDate('d-m-y'))
        return 1;

      if(b.File.Date.toDate('d-m-y') > a.File.Date.toDate('d-m-y'))
        return -1;
      
      return 0;
    });

    let ret: string[] = [];

    for(const file of locked)
    {
      let timeLeading = file.File.Date.toDate('d-m-y').getTime() - new Date().getTime();

      ret.push(timeLeading.msToYDHMS());
    }

    return ret;
  }

  public getFilesByFolder(selectedFolder: string)
  {    
    return this.files.filter(f => f.File.Folder == (selectedFolder.endsWith('/') ? selectedFolder.substring(0, selectedFolder.length-1) : selectedFolder) && f.File.Date.toDate('d-m-y') <= new Date());
  }

  public calculateFolderSize(folder: string)
  {
    let sizes: number = 0;
    const files = this.files.filter(f => f.File.Folder.startsWith(folder) && f.File.Date.toDate('d-m-y') <= new Date() );
    for(const file of files)
    {
      sizes = sizes+(+file.File.Size);
    }

    return sizes;
  }

  public getHigherFileDate(folder: string)
  {
    const recentFile = this.files.filter(f => f.File.Folder.startsWith(folder) && f.File.Date.toDate('d-m-y') <= new Date()).sort((a, b) => {
      if(a.File.Date == undefined)
        return 0;
      
      if(b.File.Date == undefined)
        return 0;

      if(a.File.Date.toDate('d-m-y') < b.File.Date.toDate('d-m-y'))
        return 1;

      if(b.File.Date.toDate('d-m-y') < a.File.Date.toDate('d-m-y'))
        return -1;
      
      return 0;
    }).firstOrDefault();

    return recentFile != null ? recentFile.File.Date : '';
  }
}
