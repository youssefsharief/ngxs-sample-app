import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { Activity } from 'src/app/core/models/Activity';
import { convertDateToReadableForm } from 'src/app/core/services/date-utility';
import { ActivitiesState, DeleteActivity } from '../activities.state';
import { ProgramsState } from '../../programs/programs.state';
import { ChangeActivitiesPage, UIState } from '../../ui/ui.state';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesListComponent implements OnInit {

  activities$: Observable<Activity[]>;
  activitiesCount$: Observable<number>;
  
  currentPage$: Observable<number>;
  programName$: Observable<string>;
  programId: number;
  
  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.programId = parseInt(this.route.snapshot.params['programId'], 10);
    this.activities$ = this.store.select(ActivitiesState.selectTenActivities(this.programId));
    this.activitiesCount$ = this.store.select(ActivitiesState.selectActivitiesCount(this.programId));
    this.currentPage$ = this.store.select(UIState.selectAtivitiesPageNumber(this.programId));
    this.programName$ = this.store.select(ProgramsState.selectProgramName(this.programId));
  }

  changePage(e: { page: number }) {
    this.store.dispatch(new ChangeActivitiesPage(this.programId, e.page ));
  }

  convertDate(str) {
    return convertDateToReadableForm(str);
  }

  delete(activity) {
    return this.store.dispatch(new DeleteActivity(activity.id));
  }


}
