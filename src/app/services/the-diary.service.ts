import { PlatformLocation } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiaryNote } from '../interfaces/diary-note';
import { DiaryNotesService } from './diary-notes.service';

@Injectable({
  providedIn: 'root'
})
export class TheDiaryService {

  constructor(private platformLocation: PlatformLocation,
    private modalService: NgbModal) {
    platformLocation.onPopState(() => this.modalService.dismissAll());
  }

  open() {
    this.modalService.open(DiaryModalContent,
    {
        fullscreen: true,
        backdrop: false,
        animation: false,
        modalDialogClass: 'ame-diary-modal',
        backdropClass: 'ame-diary-modal',
        windowClass: 'draggable ame-diary-modal'
    });
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
        <div class="container-fluid">
            <div class="row buttons-image-modal">
                <div class="col-md-auto btn-mac-modal">
                    <button class="btn-mac mac-close" (click)="activeModal.close('Cross click')"></button>
                    <button class="btn-mac mac-minimize" (click)="activeModal.dismiss('Cross click')"></button>
                    <button class="btn-mac mac-maximize" disabled></button>
                </div>
                <div class="col-md-auto buttons-diary-col1">
                    <!-- menu-->
                    <button class="modal-image-btn">
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
                        </svg>
                    </button>
                    <!-- zoom out-->
                    <button class="modal-image-btn">
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" width="16" height="16" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m4 3c-.478 0-1 .379-1 1v16c0 .62.519 1 1 1h16c.621 0 1-.52 1-1v-16c0-.478-.379-1-1-1zm7.25 16.5h-6.75v-6.75h6.75zm8.25-6.75v6.75h-6.75v-6.75zm0-8.25v6.75h-6.75v-6.75zm-15 0h6.75v6.75h-6.75z" fill-rule="nonzero"/>
                        </svg>
                    </button>
                    <!-- zoom in-->
                    <button class="modal-image-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
                        </svg>
                    </button>
                    <!-- zoom share-->
                    <button class="modal-image-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M18 14.45v6.55h-16v-12h6.743l1.978-2h-10.721v16h20v-10.573l-2 2.023zm1.473-10.615l1.707 1.707-9.281 9.378-2.23.472.512-2.169 9.292-9.388zm-.008-2.835l-11.104 11.216-1.361 5.784 5.898-1.248 11.103-11.218-4.536-4.534z"/>
                        </svg>
                    </button>
                </div>
                <div class="col-md-auto buttons-diary-col2">
                    <!-- zoom cut-->
                    <button class="modal-image-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"/>
                        </svg>
                    </button>
                    <!-- zoom rotate-->
                    <button class="modal-image-btn">
                        <svg clip-rule="evenodd" fill-rule="evenodd" width="16" height="16" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-12.5 15.5h-4v-4h4zm1.5-4h4v4h-4zm9.5 0v4h-4v-4zm-15-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4zm-11-5.5h4v4h-4zm5.5 0h4v4h-4zm5.5 0h4v4h-4z" fill-rule="nonzero"/>
                        </svg>
                    </button>
                    <!-- zoom edit-->
                    <button class="modal-image-btn">
                        <svg width="16" height="16" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm0 1.5c-4.69 0-8.498 3.807-8.498 8.497s3.808 8.498 8.498 8.498 8.497-3.808 8.497-8.498-3.807-8.497-8.497-8.497zm-5.049 8.886 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/>
                        </svg>
                    </button>
                    <!-- zoom edit-->
                    <button class="modal-image-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z"/>
                        </svg>
                    </button>
                </div>
                <div class="col-md-auto buttons-diary-col3">
                    <!-- zoom cut-->
                    <button class="modal-image-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M9 12c0-.552.448-1 1.001-1s.999.448.999 1-.446 1-.999 1-1.001-.448-1.001-1zm6.2 0l-1.7 2.6-1.3-1.6-3.2 4h10l-3.8-5zm5.8-7v-2h-21v15h2v-13h19zm3 2v14h-20v-14h20zm-2 2h-16v10h16v-10z"/>
                        </svg>
                    </button>
                    <!-- zoom rotate-->
                    <button class="modal-image-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <path d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z"/>
                        </svg>
                    </button>
                    <!-- zoom edit-->
                    <button class="modal-image-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                            <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z"></path>
                        </svg>
                    </button>
                </div>
                <div class="col modal-image-search">
                    <!-- search-->
                    <label class="modal-image-search-label">
                        <input class="modal-image-search" type="text" placeholder="Search">
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-body">
        <div class="crumpled-paper">
            <div class="container-fluid notes">
                <div class="row notes">
                    <div class="col-md-auto folder-list">
                        <p class="omm">{{'Diary.OMM' | translate}}</p>
                        <p class="list-element">{{'Diary.Diary' | translate}}</p>
                    </div>
                    <div class="col-md-auto note-list">
                        @for (note of diaryNotes; track $index) {
                            <button class="note-item" (click)="noteClick(note)">
                                <p>{{note.day | translate}}</p>
                                <span><p>{{note.hour | translate}}</p></span>
                            </button>
                        }
                    </div>
                    <div class="col note">
                        @if (selectedNote !== undefined) {
                            @if (selectedNote.dayLong != undefined) {
                                <p class="omm header" style="text-align: center;">{{selectedNote.dayLong | translate}}</p>
                            }
                            @if (selectedNote.text != undefined) {
                                <div>
                                    @for(line of selectedNote.text; track $index) {
                                        <p>{{line | translate}}</p>
                                    }
                                </div>
                            }
                            @if (selectedNote.images != undefined) {
                                <div class="note-image">
                                    @for (image of selectedNote.images; track $index) {
                                        <s-img [img]="image"></s-img>
                                    }
                                </div>
                            }
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class DiaryModalContent {

    public diaryNotes: DiaryNote[] = [];

    selectedNote: DiaryNote | undefined;

    constructor(public activeModal: NgbActiveModal, diaryNotesService: DiaryNotesService) {
        diaryNotesService.get().then(data => this.diaryNotes = data);
    }

    dismiss(): void{
        this.activeModal.dismiss('cancel click');
    }

    close(): void {
        this.activeModal.close('Ok click');
    }

    noteClick(note: DiaryNote): void
    {
        this.selectedNote = note;
    }
}