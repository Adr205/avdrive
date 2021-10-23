import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.scss'],
})
export class ModalPhotoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalPhotoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      img: String,
      name:String
    },
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ){};

  ngOnInit(): void {}
}
