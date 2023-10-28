import {Component} from '@angular/core';
import {UserService} from '../../common/service/user.service';
import {User, UserResponse} from '../../common/model/user.model';

@Component({
  selector: 'app-borrowing-page',
  templateUrl: './borrowing-page.component.html',
  styleUrls: ['./borrowing-page.component.css']
})
export class BorrowingPageComponent {

  users?: UserResponse;

  constructor(private userService: UserService) {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
}
