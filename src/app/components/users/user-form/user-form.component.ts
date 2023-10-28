import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  userForm: FormGroup;
  @Output() userSubmitted = new EventEmitter<{ firstName: string, lastName: string }>();

  constructor() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
   }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      // You can send the data to the server or perform any other action here.
      this.userSubmitted.emit({
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName
      });
    }
  }
}