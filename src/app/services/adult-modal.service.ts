import { CommonModule, PlatformLocation } from '@angular/common';
import { Component, Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AdultModalService {

  constructor(private platformLocation: PlatformLocation,
    private modalService: NgbModal,
    private route: Router,
    private cookiesService: CookiesService) {
    platformLocation.onPopState(() => this.modalService.dismissAll());
  }

  openInPost(nsfw: boolean = false, cringe: boolean = false): NgbModalRef | null {

    if((this.cookiesService.get('tesla-com-nsfw') != 'true' && nsfw) || cringe)
    {
      return this.modalService.open(AdultModalContent, {centered: true, modalDialogClass: 'warningModal', backdropClass: 'warningModal'});
    }
    
    return null;
  }
}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  template: `
    <div class="modal-body">
      <p style="text-align: center;">{{ModalMessage | translate}}</p>
      @if (CW != undefined) {
        @if(CW.length > 0) {
          <div>
            <p>{{'Posts.CWs' | translate}}: @for (w of CW; track w; let i = $index) {
              <span>{{(i == 0 ? ('CW.'+w | translate) : ('CW.'+w | translate | lowercase))+(i < CW.length - 1 ? i == CW.length - 2 ? ('And' | translate | lowercase) : ', ': '')}}</span>
            }</p>
          </div>
        }
      }
      <div class="form-check" [hidden]="!NSFW">
        <input (change)="onChange($event)" class="form-check-input custom-check" type="checkbox" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          {{'ModalRemindMe' | translate}}
        </label>
      </div>
    </div>
    <div class="modal-footer justify-content-center">
        <button type="button" ngbAutofocus class="btn-blue btn" (click)="no()">{{'ModalNo' | translate}}</button>
        @if (HASSFW && NSFW && CRINGE) {
        <button type="button" class="btn-blue btn" (click)="onlySfw()">{{'ModalOnlySfw' | translate}}</button>
        }
        <button type="button" class="btn-red btn" (click)="yes()">{{'ModalYes' | translate}}</button>
    </div>
  `
})
export class AdultModalContent {
  RemindMe: string = "";
  RemindMeValue: boolean = false;

  @Input() ModalMessage: 'Modal18Check' | 'ModalCringe' | 'ModalCringe18Check' = 'Modal18Check';
  @Input() NSFW: boolean = true;
  @Input() CRINGE: boolean = false;
  @Input() HASSFW: boolean = false;
  @Input() CW: string[] = [];

  constructor(public activeModal: NgbActiveModal, private translateService: TranslateService, private cookiesService: CookiesService) {
  }

  no(): void{
    this.activeModal.dismiss('no');
  }

  onlySfw(): void{
    this.activeModal.close('sfw');
  }

  yes(): void {
    if(this.RemindMeValue)
      if(this.cookiesService.get('tesla-com-nsfw') != 'true')
        this.cookiesService.setCookie('tesla-com-nsfw', 'true');
    this.activeModal.close('nsfw');
  }



  onChange(event: Event) {
    if(event.target != null)
      this.RemindMeValue = (<HTMLInputElement>event.target).checked;
  }
}