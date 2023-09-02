import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListDataService } from '../services/list-data.service';
import { List } from '../models/list';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnDestroy {

  public subscription: Subscription = new Subscription();

  @Input('item') item: any;
  constructor(
    private router: Router,
    private listService: ListDataService,
    private pageService: PageService,
    public dialog: MatDialog,
  ) {}

  public editItem(item: List) {
    this.sendItem(item);
    this.router.navigateByUrl('edit-item');
  }

  private sendItem(item: List) {
    this.pageService.changeItem(item);
  }

  public changeStatus(item: List, status: string) {
    this.subscription = this.listService.updateStatus(item, status).subscribe({
      next(response: boolean) {
        if (!response) {
          console.log("Unable to update status");
        }
      },
      error(error) {
        console.error("Unable to update status", error);
      },
      complete() {
        window.location.reload();
      }
    })
  }

  public openModal() {
    const modalRef = this.dialog.open(DeleteModalComponent, {
      data: {
        name: this.item.name,
        userID: this.item.userID,
        priority: this.item.priority,
        description: this.item.description,
        status: this.item.status,
        estTime: this.item.estTime
      },
      width: '250px',
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
