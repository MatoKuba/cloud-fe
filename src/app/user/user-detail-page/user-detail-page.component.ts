import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../common/service/user.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {User} from '../../common/model/user.model';
import {ToastService} from 'angular-toastify';

@UntilDestroy()
@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent {

  person?: User;

  private personId: number | null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: UserService,
              private toastService: ToastService) {
    this.personId = Number(route.snapshot.paramMap.get('userId'));
    this.getUser();
  }

  getUser(): void {
    if (this.personId !== null) {
      this.service.getUser(this.personId).pipe(untilDestroyed(this)).subscribe((person: User) => {
        this.person = person;
      });
    }
  }

  updatePerson(person: User): void {
    this.service.updateUser(person).pipe(untilDestroyed(this)).subscribe(() => {
      this.toastService.success('Osoba bola úspešne zmenená.');
    }, () => {
      this.toastService.error('Chyba. Osoba nebola zmenená.');
    })
  }

  cancel(): void {
    this.router.navigate(['user']);
  }
}
