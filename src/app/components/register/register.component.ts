import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: string;
  password: string;
  toggleClass: boolean = true;
  registered: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  // Register user on form submit

  onSubmit() {
    console.log(this.registerForm.value)
    console.log(this.authService.register(this.registerForm.value))
    this.registered = "Nu är du registrerad, logga in för att använda editorn.";
  }

  // Opens and closes accordion
  
  toggle() {
    if (this.toggleClass == false) {
      this.toggleClass = true
    } else {
      this.toggleClass = false
    }
  }

}
