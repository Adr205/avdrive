import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { User } from '../models/user';

export class Usr {
  public _id!: string;
  public fName!: string;
  public lName!: string;
  public email!: string;
  public password!: string;
  public priv!: string;
  public img!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(
    _id: string,
    fName: string,
    lName: string,
    email: string,
    password: string,
    priv: string,
    img: string,
    createdAt: Date,
    updatedAt: Date
  ) {}
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Usr[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsersTags();
  }

  public getUsersTags() {
    return this.http.get<any>(environment.api_users).subscribe((response) => {
      //console.log(response);
      this.users = response;
      // this.tagsSave = this.tags;
      // console.log(this.users);
    });
  }

  public openModal(usr: Usr) {
    // console.log(usr);
    const modalConfig = new MatDialogConfig();
    modalConfig.data = {
      fName: usr.fName,
      lName: usr.lName,
      email: usr.email,
      priv: usr.priv,
      id: usr._id,
      title: 'Edit User',
    };
    let modal = this.modal.open(ModalUserComponent, modalConfig);
    modal.afterClosed().subscribe((result) => {
      this.reloadUsers();
    });
  }

  openModalAdd() {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = {
      fName: '',
      lName: '',
      email: '',
      priv: '',
      id: '-1',
      title: 'Add User',
    };
    let modal = this.modal.open(ModalUserComponent, modalConfig);
    modal.afterClosed().subscribe((result) => {
      this.reloadUsers();
    });
  }

  openModalDelete(usr: Usr) {
    const modalConfig = new MatDialogConfig();
    modalConfig.data = {
      id: usr._id,
      name: usr.fName + ' ' + usr.lName,
      title: 'Delete ',
    };
    let modal = this.modal.open(ModalDeleteComponent, modalConfig);
    modal.afterClosed().subscribe((result) => {
      this.reloadUsers();
    });
  }

  public reloadUsers() {
    this.ngOnInit();
  }

  Search(e: Event) {
    e.preventDefault();
    let filterText = (<HTMLInputElement>(
      document.getElementById('searchText')
    )).value.toLowerCase();

    if (filterText != '') {
      return this.http
        .get<any>('https://casa-labra.com/api/users/' + filterText)
        .subscribe((response) => {
          this.users = response;
        });
    } else {
      return this.getUsersTags();
    }
  }
}

export function reload(){
  
}