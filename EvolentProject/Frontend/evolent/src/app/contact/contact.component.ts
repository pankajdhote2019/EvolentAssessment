import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact/contact.service';
import { IContact } from '../contact/icontact';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactData: Array<IContact>;
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'PhoneNumber', 'Status', 'Action'];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(private contactService: ContactService, public dialog: MatDialog) {
  }


  ngOnInit() {
    this.getContacts();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }


  getContacts() {
    this.contactService.get().subscribe((data: IContact[]) => this.contactData = data);
  }

  addRowData(row_obj) {
    var obj = ({
      id: 0,
      firstName: row_obj.firstName,
      lastName: row_obj.lastName,
      email: row_obj.email,
      phoneNumber: row_obj.phoneNumber,
      status: row_obj.status
    });
    this.contactService.add(obj).subscribe({
      complete: () =>
        this.getContacts()
    });
    this.table.renderRows();
  }
  updateRowData(row_obj) {
    var obj = ({
      id: row_obj.id,
      firstName: row_obj.firstName,
      lastName: row_obj.lastName,
      email: row_obj.email,
      phoneNumber: row_obj.phoneNumber,
      status: row_obj.status
    });
    this.contactService.update(obj).subscribe({
      complete: () =>
        this.getContacts()
    });
  }
  deleteRowData(row_obj) {

    this.contactService.remove(row_obj).subscribe({
      complete: () =>
        this.contactData = this.contactData.filter((value, key) => {
          return value.id != row_obj.id;
        }),
    });
  }
}
