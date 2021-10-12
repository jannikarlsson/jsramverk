import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DocsService } from '../../services/docs.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  @Input() singleTitle: string;
  @Input() singleId: string;
  @Input() active: string;
  @Input() token: string;

  emailForm: FormGroup;
  inviteSent = "";

  constructor(private docsService: DocsService) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl(null)
    })
  }

  send() {
    let email = this.emailForm.get('email').value;
    console.log({"email": email, "id": this.singleId, "title": this.singleTitle, "user": this.active})
    this.docsService.addPermission({"id": this.singleId, "email": email, "title": this.singleTitle, "sender": this.active}, this.token);
    this.inviteSent = "Inbjudan har skickats till " + email;
    this.emailForm.controls['email'].reset();
  }

}
