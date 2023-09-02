import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageService } from '../services/page.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {

  public formError = '';
  private result = false;
  private submitted = false;

  public itemCredentials = {
    name: '',
    userID: '',
    priority: '',
    description: '',
    status: '',
    estTime: '',
  };

  public subscription: Subscription = new Subscription();

  constructor(
    private listDataService: ListDataService,
    private router: Router,
    private pageService: PageService,
  ) { }

  ngOnInit() {
    this.setOption();
  }

  public addItem() {
    this.submitted = true;
    const that = this;

    if (!this.itemCredentials.name || !this.itemCredentials.priority) {
      this.formError = "Name and priority are required to add item"
    }
    else {
      this.formError = '';
      this.subscription = this.listDataService.addItem(this.itemCredentials).subscribe({
        next(response: boolean) {
          if (response) {
            that.result = true;
          } else {
            that.result = false;
          }
        },
        error(err) {
          console.error("Unable to add item", err);
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
private setOption() {
  this.pageService.changeSeachOption(false);
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
