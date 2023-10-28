import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserResponse} from '../../common/model/user.model';
import {Pagination} from '../../common/model/pagination.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input()
  persons?: UserResponse;

  @Output()
  personToUpdate = new EventEmitter<number>();

  @Output()
  personToDelete = new EventEmitter<number>();

  @Output()
  pageChange = new EventEmitter<Pagination>(); //

  private defaultPageNumber = 0;

  private defaultTotalElements = 10;

  private defaultPageSize = 10;

  private defaultFilter = '';

  filterForm = new FormGroup({
    lastName: new FormControl()
  });

  updatePerson(userId: number): void {
    this.personToUpdate.emit(userId);
  }

  deletePerson(userId: number): void {
    this.personToDelete.emit(userId);
  }

  changePage(pageNumber: number): void {
    this.defaultPageNumber = pageNumber - 1;
    this.pageChange.emit({
      page: this.defaultPageNumber,
      size: this.persons?.pageable?.pageSize ? this.persons?.pageable?.pageSize : this.defaultPageSize,
      filter: {
        lastName: this.defaultFilter
      }
    });
  }

  filter(): void {
    this.defaultPageNumber = 0;
    this.defaultFilter = this.filterForm.controls.lastName.value;
    this.pageChange.emit({
      page: this.defaultPageNumber,
      size: this.persons?.pageable?.pageSize ? this.persons?.pageable?.pageSize : this.defaultPageSize,
      filter: {
        lastName: this.defaultFilter
      }
    });
  }

  getPageSize(): number {
    return this.persons?.pageable?.pageSize ? this.persons?.pageable?.pageSize : this.defaultPageSize;
  }

  getPageNumber(): number {
    return this.persons?.pageable?.pageNumber ? this.persons?.pageable?.pageNumber + 1 : this.defaultPageNumber;
  }

  getTotalElements(): number {
    return this.persons?.totalElements ? this.persons?.totalElements : this.defaultTotalElements;
  }
}
