import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      name: string;
      title: string;
    },
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  deleteUser(id: string, $event: Event) {
    $event.preventDefault();
    // console.log(id);
    const headers = { 'content-type': 'application/json' };
    return this.http
      .delete<any>(
        environment.api_delete_user + id,{},
      )
      .subscribe((data) => {

        //Probar con el ngOnInit del componente user
        if(id == localStorage.getItem('ID')){
          this.authService.logout();
          this.router.navigateByUrl('');
        }
        this.dialogRef.close();
      });
  }
}
