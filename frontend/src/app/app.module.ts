import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './aside/aside.component';
import { UsersComponent } from './users/users.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileTagComponent } from './file-tag/file-tag.component';
import { ModalPhotoComponent } from './modal-photo/modal-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    UsersComponent,
    ModalUserComponent,
    ModalDeleteComponent,
    DragDropComponent,
    FileTagComponent,
    ModalPhotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
