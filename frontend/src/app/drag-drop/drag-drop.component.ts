import { Component, OnInit } from '@angular/core';
import { DragdropService } from '../dragdrop.service';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  myFiles: string[] = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    
  }

  submit() {
    // console.log('send');
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
    }

    var user = String(localStorage.getItem('Name'));
    var userID = String(localStorage.getItem("ID"));
    const time = new Date();
    const year = time.getFullYear();
    const month = this.getMonth(time.getMonth() + 1);
    const day = time.getDate();

    const date = `${day}-${month}-${year}`;

    formData.append('user',user);
    formData.append('date',date);
    formData.append('userID',userID);

    // console.log('GET ALL');
    // console.log(formData.getAll('files'));
    const headers = {
      'Access-Control-Allow-Origin': '*',
    };

    this.http
      .post('https://casa-labra.com/api/upload', formData)
      .subscribe((res) => {
        // console.log(res);
        this.myFiles = [];

        alert('Uploaded Successfully.');
      });
  }

  getMonth(month: number) {
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

  ngOnInit(): void {}
}
