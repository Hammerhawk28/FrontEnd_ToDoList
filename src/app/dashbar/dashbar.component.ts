import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../models/list';
import { ListDataService } from '../services/list-data.service';
import { PageService } from '../services/page.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashbar',
  templateUrl: './dashbar.component.html',
  styleUrls: ['./dashbar.component.css']
})
export class DashbarComponent implements OnInit {

private userList: List[];
private sortedList: List[];
private selectedList: List[];
private subscription: Subscription = new Subscription();
private statusOrder = ["no", "in", "co" ]
private priorityOrder = ["hig", "med", "low"]


@Output() newSort = new EventEmitter<List[]>
  constructor(
    private router: Router,
    private listService: ListDataService,
    private pageService: PageService
  ) {
    this.userList = [];
    this.sortedList = [];
    this.selectedList = [];
  }

  ngOnInit() {
    this.pageService.currentList.subscribe(list => this.userList = list)
  }

  public sortBy(sortBy: string) {
    const that = this;

    if (sortBy === "name") {
        this.sortedList = this.userList.sort(function(a, b) {
          console.log("sort by name executed");
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
        this.newSort.emit(this.sortedList);
      } else if (sortBy === "status") {
        console.log("sort by status executed")
        this.sortedList = this.userList.sort(function(a, b) {
          const aStatus = a.status.substring(0, 2).toLowerCase();
          const bStatus = b.status.substring(0, 2).toLowerCase();
          console.log(aStatus + " " + bStatus);
          return (that.statusOrder.indexOf(aStatus) - that.statusOrder.indexOf(bStatus));

        });
        this.newSort.emit(this.sortedList);
      } else if (sortBy === "priority") {
        console.log("sort by priority executed")
        this.sortedList = this.userList.sort(function(a, b) {
          const aPriority = a.priority.substring(0, 3).toLowerCase();
          const bPriority = b.priority.substring(0, 3).toLowerCase();
          return (that.priorityOrder.indexOf(aPriority) - that.priorityOrder.indexOf(bPriority));
        });
        this.newSort.emit(this.sortedList);
      }
    }

  public selectBy(selectBy: string) {
    const that = this;
    this.selectedList = [];

    if (selectBy === "Not Started") {
      this.userList.forEach(function(item: List) {
        if (item.status === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    } else if (selectBy === "In Progress") {
      this.userList.forEach(function(item: List) {
        if (item.status === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    } else if (selectBy === "Complete") {
      this.userList.forEach(function(item: List) {
        if (item.status === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    } else if (selectBy === "High") {
      this.userList.forEach(function(item: List) {
        if (item.priority === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    } else if (selectBy === "Medium") {
      this.userList.forEach(function(item: List) {
        if (item.priority === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    } else if (selectBy === "Low") {
      this.userList.forEach(function(item: List) {
        if (item.priority === selectBy) {
          that.selectedList.push(item);
        }
      });
      this.newSort.emit(this.selectedList);

    }
  }


  public addItemPrompt() {
    this.router.navigateByUrl("add-item");
  }

  ngOnDestroy() {

  }

}
