import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteData } from '../ngrx/data.action';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css'],
  host: { 'class': 'position-relative', 'style': 'top:80px' }
})
export class NavTabComponent implements OnInit {
  active = 0;
  data: any = [];

  chartObservable$: Observable<any>;

  constructor(private store: Store<{ 'chartData': any }>) {
    this.chartObservable$ = store.select('chartData');
  }

  ngOnInit(): void {
    this.chartObservable$.subscribe((data: any) => {
      this.data = data;
    })
  }

  close($event: any, tab: any) {
    $event.stopPropagation();
    this.store.dispatch(deleteData({ id: tab.id }));
    this.active = 0;
  }

}
