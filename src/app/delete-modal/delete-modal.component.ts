import { Component, Inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { List } from '../models/list';
import { ListDataService } from '../services/list-data.service';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],

})
export class DeleteModalComponent {

  private currentItem: List;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: List,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private pageService: PageService,
    private listService: ListDataService,
  ) {
    this.currentItem = {
      name: '',
      userID: '',
      priority: '',
      description: '',
      status: '',
      estTime: ''
    };
  }

  ngOnInit() {
  }

  public deleteItem(item: List) {

    this.listService.removeItem(this.data).subscribe({
      next(response: boolean) {
        if (!response) {
          console.log("Unable to remove item from list");
        }
      },
      error(error: any) {
        console.error("Unable to remove item", error);
      },
      complete() {
        window.location.reload();
      }
    })
  }
}
