import { Component, OnDestroy, OnInit} from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from '../models/list';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  public formError = "";
  public editForm: FormGroup
  private submitted = false;
  public currentItem: List;
  private result = false;
  public currentStatus = '';

  public pageSub: Subscription = new Subscription();
  public updateSub: Subscription = new Subscription();

  constructor(
    private listService: ListDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pageService: PageService,
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      estTime: ['', Validators.required]
    })
    this.currentItem = {
      name: '',
      userID: '',
      priority: '',
      description: '',
      status: '',
      estTime: ''
    }
   }

  ngOnInit() {
    this.setOption();
    this.pageSub = this.pageService.currentItem.subscribe(item => this.currentItem = item);

    this.editForm.patchValue({
      name: this.currentItem.name,
      priority: this.currentItem.priority,
      description: this.currentItem.description,
      status: this.currentItem.status,
      estTime: this.currentItem.estTime
    });

    const statusElement = document.getElementById("selectedStatus");
    if (statusElement) {
      statusElement.innerHTML = this.currentItem.status;
    }

    const priorityElement = document.getElementById("selectedPriority");
    if (priorityElement) {
      priorityElement.innerHTML = this.currentItem.priority;
    }
  }

  setOption() {
    this.pageService.changeSeachOption(false);
  }




  public editItem() {
    const that = this;
    this.submitted = true;

    if (this.editForm.valid) {
       this.updateSub = this.listService.updateItem(this.editForm.value).subscribe({
        next(response: boolean) {
          if (response) {
            that.result = true;
          } else {
            that.result = false;
          }
        },
        error(err) {
          that.result = false;
          console.error("Unable to update", err);
        },
        complete() {
          setTimeout(() => {
            that.router.navigateByUrl('list-home');
          }, 1000)
        }
       })
  }
}

  public checkResult() {
    if (this.submitted === true) {
    return this.result
  }
  return null;
}

ngOnDestroy() {
  this.pageSub.unsubscribe();
  this.updateSub.unsubscribe();
}

}
