import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../services/auth.service';
import { UsersComponent } from '../users/users.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  fName!: String;
  lName!: String;
  email!: String;
  priv!: String;
  password!: String;
  cpassword!: String;
  constructor(
    public dialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fName: string;
      lName: string;
      email: string;
      priv: string;
      id: string;
      title: string;
    },
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  updateUser(id: string, $event: Event) {
    if (id != '-1') {
      $event.preventDefault();
      // console.log(id);
      const headers = { 'content-type': 'application/json' };

      this.fName = (<HTMLInputElement>document.getElementById('fName')).value;
      this.lName = (<HTMLInputElement>document.getElementById('lName')).value;
      this.email = (<HTMLInputElement>(
        document.getElementById('email')
      )).value.toLowerCase();
      this.priv = (<HTMLInputElement>document.getElementById('priv')).value;

      if (
        this.fName != '' &&
        this.lName != '' &&
        this.email != '' &&
        this.priv != '' &&
        (this.priv == 'admin' || this.priv == 'user')
      ) {
        return this.http
          .put<any>(
            environment.api_put_user + id,
            {
              fName: (<HTMLInputElement>document.getElementById('fName')).value,
              lName: (<HTMLInputElement>document.getElementById('lName')).value,
              email: (<HTMLInputElement>(
                document.getElementById('email')
              )).value.toLowerCase(),
              priv: (<HTMLInputElement>document.getElementById('priv')).value,
            },
            { headers: headers }
          )
          .subscribe((data) => {
            // console.log("User:");
            // console.log(data.fName);
            if (localStorage.getItem('ID') == data._id) {
              if (
                localStorage.getItem('Name') !=
                data.fName + ' ' + data.lName
              ) {
                localStorage.setItem('Name', data.fName + ' ' + data.lName);
              }

              if (data.priv != localStorage.getItem('Priv')) {
                localStorage.setItem('Priv', data.priv);
                window.location.reload();
              }
            }
            this.dialogRef.close();
          });
      } else {
        if (this.fName == '') {
          document
            .getElementById('fName')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('fName')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.lName == '') {
          document
            .getElementById('lName')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('lName')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.email == '') {
          document
            .getElementById('email')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('email')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.priv == '') {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
          // console.log('Esta vacia');
        } else if (this.priv != 'admin' && this.priv != 'user') {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
          console.log('Ingresa uno valido');
        } else {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: none');
        }
        return -1;
      }
    } else {
      $event.preventDefault();
      // console.log(id);
      const headers = { 'content-type': 'application/json' };
      const time = new Date();
      const year = time.getFullYear();
      const month = getMonth(time.getMonth() + 1);
      const day = time.getDate();

      const date = `${day}-${month}-${year}`;

      function getMonth(month: number) {
        switch (month) {
          case 1:
            return 'Jan';
            break;
          case 2:
            return 'Feb';
            break;
          case 3:
            return 'Mar';
            break;
          case 4:
            return 'Apr';
            break;
          case 5:
            return 'May';
            break;
          case 6:
            return 'Jun';
            break;
          case 7:
            return 'Jul';
            break;
          case 8:
            return 'Aug';
            break;
          case 9:
            return 'Sep';
            break;
          case 10:
            return 'Oct';
            break;
          case 11:
            return 'Nov';
            break;
          case 12:
            return 'Dec';
            break;
          default:
            return 'Not found';
        }
      }
      this.fName = (<HTMLInputElement>document.getElementById('fName')).value;
      this.lName = (<HTMLInputElement>document.getElementById('lName')).value;
      this.email = (<HTMLInputElement>(
        document.getElementById('email')
      )).value.toLowerCase();
      this.priv = (<HTMLInputElement>document.getElementById('priv')).value;
      const password = (<HTMLInputElement>document.getElementById('password'))
        .value;
      const cpassword = (<HTMLInputElement>document.getElementById('cpassword'))
        .value;
      if (
        this.fName != '' &&
        this.lName != '' &&
        this.email != '' &&
        this.password != '' &&
        this.cpassword != '' &&
        this.priv != '' &&
        (this.priv == 'admin' || this.priv == 'user')
      ) {
        if (password === cpassword) {
          return this.http
            .post<any>(
              environment.api_post_user,
              {
                fName: (<HTMLInputElement>document.getElementById('fName'))
                  .value,
                lName: (<HTMLInputElement>document.getElementById('lName'))
                  .value,
                email: (<HTMLInputElement>(
                  document.getElementById('email')
                )).value.toLowerCase(),
                priv: (<HTMLInputElement>document.getElementById('priv')).value,
                password: password,
                createdAt: date,
              },
              { headers: headers }
            )
            .subscribe((data) => {
              // console.log("User:");
              // console.log(data.fName);
              // if (localStorage.getItem('ID') == data._id) {
              //   if (data.priv != localStorage.getItem('Priv')) {
              //     localStorage.setItem('Priv', data.priv);
              //   }
              // }

              // window.location.reload();
              this.dialogRef.close();
            });
        } else {
          document.getElementById('password')?.classList.add('wrong');
          document.getElementById('cpassword')?.classList.add('wrong');
          return -1;
        }
      } else {
        if (this.fName == '') {
          document
            .getElementById('fName')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('fName')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.lName == '') {
          document
            .getElementById('lName')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('lName')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.email == '') {
          document
            .getElementById('email')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
        } else {
          document
            .getElementById('email')
            ?.setAttribute('style', 'border-bottom: none');
        }

        if (this.password == '') {
          document
            document.getElementById('password')?.classList.add('wrong');
        } else {
          document.getElementById('password')?.classList.remove('wrong');
        }

        if (this.cpassword == '') {
          document.getElementById('cpassword')?.classList.add('wrong');
        } else {
          document.getElementById('cpassword')?.classList.remove('wrong');
        }

        if (this.priv == '') {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
          console.log('Esta vacia');
        } else if (this.priv != 'admin' && this.priv != 'user') {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: 1px solid red');
          console.log('Ingresa uno valido');
        } else {
          document
            .getElementById('priv')
            ?.setAttribute('style', 'border-bottom: none');
        }
        return -1;
      }
    }
  }
}
