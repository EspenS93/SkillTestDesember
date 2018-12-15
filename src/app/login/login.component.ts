import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from "../_services/authenticator.service";
import { Router, ActivatedRoute } from '@angular/router'
import { User } from "../_models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: User = new User();
  loading = false;
  returnUrl: string;
  error = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticatorService: AuthenticatorService
  ) { }

  ngOnInit() {
    this.authenticatorService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.user = new User();
  }

  closeLoginModal(): void {
    document.getElementById('loginModal').style.display = 'none';
  }

  login(): void {
    this.loading = true;
    this.authenticatorService.login(this.user.username, this.user.password)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;
          }
        )
  }

}
