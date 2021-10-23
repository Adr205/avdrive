import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getPriv();
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  getPriv() {
    if (localStorage.getItem('Priv') != 'admin') {
      document.getElementById('usersLI')?.classList.add('noDisp');
    } 
    else {
      document.getElementById('usersLI')?.classList.remove('noDisp');
    }

  }
}
