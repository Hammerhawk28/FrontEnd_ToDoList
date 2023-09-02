import { Component, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router'
import { ListDataService } from '../services/list-data.service';
import { PageService } from '../services/page.service';
import { List } from '../models/list';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchInput = "";
  public formError = "";
  private searchOption = true;

  public subscription: Subscription = new Subscription();

  @Output() newSearch = new EventEmitter<List[]>()
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private listService: ListDataService,
    private pageService: PageService,
  ) { }

  ngOnInit() {
    this.pageService.currentSearch.subscribe(option => this.searchOption = option);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }

  public searchItem() {

    const that = this;

    if (!this.searchInput) {
      this.formError = "No search input"
    } else {
      this.subscription = this.listService.searchItem(this.searchInput).subscribe({
        next(response: List[]) {
          that.newSearch.emit(response);
        },
        error(error) {
          console.error("Error", error);
        },
        complete() {

        }
      })
    }
  }

  public checkOption() {
    return this.searchOption;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
