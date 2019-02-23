import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';

import { FetchData } from './main/main.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new FetchData());
  }
}
