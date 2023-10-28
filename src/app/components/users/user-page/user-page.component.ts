import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/common/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  user?: { firstName: string, lastName: string };
  users?: [];

  constructor(private userService: UserService){
    this.getAllUsers();
  }

  createUser(firstName: string, lastName: string) {
    // Store the user data
    this.user = { firstName, lastName };
    console.log('User created:', this.user);
    // You can also send this data to a server, or handle it in any other way here
    this.userService.addUser(this.user).subscribe(response => {
      console.log('User added:', response);
	this.getAllUsers();
    });
  }

  
  // Or use the service to retrieve all users
  getAllUsers(){
    console.debug("getting users");
    this.userService.getUsers().subscribe(users => {
      console.debug("getting users");
      this.users = users;
    });
  }
}
