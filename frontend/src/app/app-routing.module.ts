import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsideComponent } from './aside/aside.component'; 
import { UsersComponent } from './users/users.component';
import { AuthModule } from './auth/auth.module';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FileTagComponent } from './file-tag/file-tag.component';


const routes: Routes = [
  {path: '', redirectTo:'/auth', pathMatch:'full'},
  {path: 'mydrive', component: FileTagComponent},
  {path: 'auth', loadChildren: ()=>AuthModule},
  {path: 'users', component: UsersComponent},
  {path: 'upload', component: DragDropComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
