import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: string;
  password: string;
  token: string;

  @Output() tokenEvent = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit() {
    this.user = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.authService.login(this.loginForm.value)
      .subscribe((data) => {
        this.token = data.data.token;
        this.tokenEvent.emit(data);
      })
  }

}
