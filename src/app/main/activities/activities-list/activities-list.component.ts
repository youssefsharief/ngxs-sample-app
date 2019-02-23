import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Activity } from 'src/app/core/models/Activity';
import { convertDateToReadableForm } from 'src/app/core/services/date-utility';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesListComponent implements OnInit {

  activities$: Observable<Activity[]>;
  currentPage$: Observable<number>;
  activitiesCount$: Observable<number>;
  programName$: Observable<string>;
  programId: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.programId = parseInt(this.route.snapshot.params['programId'], 10);
    // this.activities$ = this.store.pipe(select(selectTenActivities(this.programId)));
    // this.activitiesCount$ = this.store.pipe(select(selectActivitiesCountForAProgram(this.programId)));
    // this.currentPage$ = this.store.pipe(select(selectActivitiesPageNumber(this.programId)));
    // this.programName$ = this.store.pipe(select(selectProgramName(this.programId)));
  }

  changePage(e: { page: number }) {
    // this.store.dispatch(new ChangeActivitiesPage({ programId: this.programId, pageNumber: e.page }));
  }

  convertDate(str) {
    return convertDateToReadableForm(str);
  }

  delete(activity) {
    // return this.store.dispatch(new DeleteActivity(activity.id));
  }


}
