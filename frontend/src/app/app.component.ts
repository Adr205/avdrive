import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'avdrive';
  constructor(private authService:AuthService, private router:Router){
    if(authService.getToken() != ""){
      router.navigateByUrl('mydrive');
    }else{
      router.navigateByUrl('');
    }
  }
}
