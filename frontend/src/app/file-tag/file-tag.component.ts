import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

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
    originalName: string,
  ) {}
}

@Component({
  selector: 'app-file-tag',
  templateUrl: './file-tag.component.html',
  styleUrls: ['./file-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileTagComponent implements OnInit {
  constructor(public http: HttpClient, public modal: MatDialog) {}
  pdf = 'https://casa-labra.com/public/thumb/pdf.png';
  word = 'https://casa-labra.com/public/thumb/word.png';
  excel = 'https://casa-labra.com/public/thumb/excel.png';
  ppt = 'https://casa-labra.com/public/thumb/ppt.png';
  csv = 'https://casa-labra.com/public/thumb/csv.png';
  svg = 'https://casa-labra.com/public/thumb/svg.png';
  files: File[] = [];

  ngOnInit(): void {
    this.getFilesTags();
  }

  public getFilesTags() {
    return this.http
      .get<any>('https://casa-labra.com/api/files')
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getPhotos() {
    return this.http
      .get<any>('https://casa-labra.com/api/photos')
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getFiles() {
    return this.http
      .get<any>('https://casa-labra.com/api/only-files')
      .subscribe((response) => {
        this.files = response;
      });
  }

  public getMyFiles() {
    return this.http
      .get<any>(
        'https://casa-labra.com/api/myfiles/' + localStorage.getItem('ID')
      )
      .subscribe((response) => {
        this.files = response;
      });
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
