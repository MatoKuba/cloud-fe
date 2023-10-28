import { Component, OnInit, TemplateRef } from '@angular/core';
import { User, UserResponse } from '../../common/model/user.model';
import { UserService } from '../../common/service/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../common/model/pagination.model';

@UntilDestroy()
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  persons?: UserResponse;
  private readonly SUCCESS_CREATE_MSG = 'Osoba bola úspešne uložená.';
  private readonly ERROR_CREATE_MSG = 'Chyba. Osoba nebola uložená.';
  private readonly SUCCESS_DELETE_MSG = 'Osoba bola úspešne zmazaná.';
  private readonly ERROR_DELETE_MSG = 'Chyba. Osoba nebola zmazaná.';
  private readonly DELETE_CONFIRM_MSG = 'Naozaj chcete vymazať osobu?';

  constructor(
    private service: UserService,
    private toastService: ToastService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(pagination?: Pagination): void {
    this.service.getUsers(pagination).pipe(untilDestroyed(this)).subscribe(persons => {
      this.persons = persons;
      console.debug("Haloo");
    });
  }

  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { size: 'sm' });
  }

  createPerson(person: User): void {
    this.service.createUser(person).pipe(untilDestroyed(this)).subscribe(() => {
      this.toastService.success(this.SUCCESS_CREATE_MSG);
      this.getPersons();
    }, () => this.handleError(this.ERROR_CREATE_MSG));
  }

  selectPersonToUpdate(personId: number): void {
    this.router.navigate(['user', personId]);
  }

  deletePerson(personId: number): void {
    if (this.confirmAction(this.DELETE_CONFIRM_MSG)) {
      this.service.deleteUser(personId).pipe(untilDestroyed(this)).subscribe(() => {
        this.toastService.success(this.SUCCESS_DELETE_MSG);
        this.getPersons();
      }, () => this.handleError(this.ERROR_DELETE_MSG));
    }
  }

  private handleError(errorMessage: string): void {
    this.toastService.error(errorMessage);
  }

  private confirmAction(message: string): boolean {
    return window.confirm(message);
  }
}
