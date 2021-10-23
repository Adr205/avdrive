import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalPhotoComponent } from '../modal-photo/modal-photo.component';

export class File {
  public _id!: number;
  public userID!: string;
  public user!: string;
  public img!: string;
  public thumbnail!: string;
  public format!: string;
  public createdAt!: string;
  public originalName!: string;

  constructor(
    _id: number,
    userID: string,
    user: string,
    img: string,
    thumbnail: string,
    format: string,
    createdAt: string,
    originalName: string
  ) {}
}

@Component({
  selector: 'app-file-tag',
  templateUrl: './file-tag.component.html',
  styleUrls: ['./file-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileTagComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public modal: MatDialog,
    private scroller: ViewportScroller
  ) {}
  pdf = 'https://casa-labra.com/public/thumb/pdf.png';
  word = 'https://casa-labra.com/public/thumb/word.png';
  excel = 'https://casa-labra.com/public/thumb/excel.png';
  ppt = 'https://casa-labra.com/public/thumb/ppt.png';
  csv = 'https://casa-labra.com/public/thumb/csv.png';
  svg = 'https://casa-labra.com/public/thumb/svg.png';
  zip = 'https://casa-labra.com/public/thumb/zip.png';
  maxPages: number = -1;
  currentPage: number = 1;
  files: File[] = [];

  all: Boolean = true;
  photos: Boolean = false;
  docs: Boolean = false;
  myFiles: Boolean = false;

  ngOnInit(): void {
    this.getPages();
    this.getFilesTags();
  }

  public getFilesTags() {
    if (!this.all) {
      this.currentPage = 1;
      this.all = true;
      this.photos == true ? (this.photos = false) : (this.photos = false);
      this.docs == true ? (this.docs = false) : (this.docs = false);
      this.myFiles == true ? (this.myFiles = false) : (this.myFiles = false);
      this.getPages();
    }
    return (
      this.http
        // .get<any>('https://casa-labra.com/api/files')
        .get<any>('https://casa-labra.com/api/files?page=' + this.currentPage)
        .subscribe((response) => {
          this.files = response;
        })
    );
  }

  public getPhotos() {
    if (!this.photos) {
      this.currentPage = 1;
      this.photos = true;
      this.all == true ? (this.all = false) : (this.all = false);
      this.docs == true ? (this.docs = false) : (this.docs = false);
      this.myFiles == true ? (this.myFiles = false) : (this.myFiles = false);
      this.getPages();
    }

    return this.http
      .get<any>('https://casa-labra.com/api/photos?page=' + this.currentPage)
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getFiles() {
    if (!this.docs) {
      this.currentPage = 1;
      this.docs = true;
      this.all == true ? (this.all = false) : (this.all = false);
      this.photos == true ? (this.photos = false) : (this.photos = false);
      this.myFiles == true ? (this.myFiles = false) : (this.myFiles = false);
      this.getPages();
    }
    return this.http
      .get<any>('https://casa-labra.com/api/only-files?page=' + this.currentPage)
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getMyFiles() {
    if (!this.myFiles) {
      this.currentPage = 1;
      this.myFiles = true;
      this.all == true ? (this.all = false) : (this.all = false);
      this.photos == true ? (this.photos = false) : (this.photos = false);
      this.docs == true ? (this.docs = false) : (this.docs = false);
      this.getPages();
    }
    return this.http
      .get<any>(
        'https://casa-labra.com/api/myfiles/' + localStorage.getItem('ID') + '/' + this.currentPage   
      )
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getPages() {
    if (this.all) {
      return this.http
        .get<any>('https://casa-labra.com/api/all-files')
        .subscribe((response) => {
          // console.log('All: ' + response);
          this.maxPages = Math.ceil(response / 20);
          // console.log('Max pages: ' + this.maxPages);
          //console.log(this.tags[0]);
        });
    } else if (this.photos) {
      return this.http
        .get<any>('https://casa-labra.com/api/all-photos')
        .subscribe((response) => {
          // console.log('All photos: ' + response);
          this.maxPages = Math.ceil(response / 20);
          // console.log('Max pages: ' + this.maxPages);
          //console.log(this.tags[0]);
        });
    } else if (this.docs) {
      return this.http
        .get<any>('https://casa-labra.com/api/all-docs')
        .subscribe((response) => {
          // console.log('All files: ' + response);
          this.maxPages = Math.ceil(response / 20);
          // console.log('Max pages: ' + this.maxPages);
          //console.log(this.tags[0]);
        });
    } else {
      return this.http
        .get<any>(
          'https://casa-labra.com/api/all-myfiles/' + localStorage.getItem('ID')
        )
        .subscribe((response) => {
          // console.log('My files: ' + response);
          this.maxPages = Math.ceil(response / 20);
          // console.log('Max pages: ' + this.maxPages);
          //console.log(this.tags[0]);
        });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      if (this.all) {
        this.ngOnInit();
      } else if (this.photos) {
        this.getPhotos();
      } else if (this.docs) {
        this.getFiles();
      } else {
        this.getMyFiles();
      }
      this.goTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.maxPages) {
      this.currentPage = this.currentPage + 1;
      if(this.all){
        this.ngOnInit();
      }else if(this.photos){
        this.getPhotos();
      }else if(this.docs){
        this.getFiles()
      }else{
        this.getMyFiles()
      }
      this.goTop();
    }
  }

  goTop() {
    this.scroller.scrollToAnchor('top');
  }

  openModalPhoto(img, name) {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = {
      img: img,
      name: name,
    };
    let modal = this.modal.open(ModalPhotoComponent, modalConfig);
    modal.afterClosed().subscribe((result) => {});
  }
}
