import { Component, OnInit } from '@angular/core';
import { ListDataService } from '../services/list-data.service';
import { Router } from '@angular/router';
import { List } from '../models/list';
import { Subscription } from 'rxjs';
import { PageService } from '../services/page.service';


@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.css']
})
export class ListHomeComponent implements OnInit {

  public userList: List[];
  private noneFound = {
    name: "No Item of That Name Found",
    userID: "",
    priority: "",
    description: "",
    status: "",
    estTime: ""
  }

  public subscription: Subscription = new Subscription();
  private deleteRequest: boolean;

  constructor(
    private listDataService: ListDataService,
    private router: Router,
    private pageService: PageService,
  ) {
    this.userList = [];
    this.deleteRequest = false;
  }

  ngOnInit(): void {
    this.setOption();
    this.getListHome();
  }

  updateSearch(searchResult: List[]) {
    this.userList = searchResult;
    if (this.userList.length < 1) {
      this.userList.push(this.noneFound);
    }
  }

  updateSort(sortResult: List[]) {
    this.userList = sortResult;
  }

  private getListHome(): List[] {

    let that = this;

    this.subscription = this.listDataService.getListHome().subscribe({
      next(response: List[]) {
        that.userList = response;
      },
      error(error: any) {
        console.error("Error Loading List", error);
      },
      complete() {
        that.pageService.changeList(that.userList);
      }
  })

  return [];
  }

  public addItemPrompt() {
    this.router.navigateByUrl("add-item");
  }

  public setOption() {
    this.pageService.changeSeachOption(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
