import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public contactService: ContactService) { }
  newContact: any = {
    name: "",
    email: "",
    message: ""
  };
  ngOnInit() {
  }

  public sendEmail() {
    console.log(this.newContact)
    this.contactService.send(this.newContact)
      .subscribe(data => {
        console.log(data)
      });
  }

}
