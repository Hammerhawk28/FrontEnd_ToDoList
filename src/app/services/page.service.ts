import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private source = new BehaviorSubject<List>({
    name: '',
    userID: '',
    priority: '',
    description: '',
    status: '',
    estTime: ''
  });
  currentItem = this.source.asObservable();

  private listSource = new BehaviorSubject<List[]>([]);
  currentList = this.listSource.asObservable();

  private searchOption = new BehaviorSubject<boolean>(true);
  currentSearch = this.searchOption.asObservable();

  constructor() { }

  changeItem(item: List) {
    this.source.next(item);
  }

  changeList(list: List[]) {
    this.listSource.next(list);
  }

  changeSeachOption(option: boolean) {
    this.searchOption.next(option);
  }

}
