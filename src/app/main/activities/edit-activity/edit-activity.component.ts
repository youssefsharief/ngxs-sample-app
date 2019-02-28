import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Activity } from 'src/app/core/models/Activity';
import { Store } from '@ngxs/store';
import { ProgramsState } from '../../programs/programs.state';
import { ActivitiesState } from '../activities.state';
import { map } from 'rxjs/operators';
import { EditActivity } from '../activities.actions';

@Component({
    selector: 'app-edit-activity',
    templateUrl: './edit-activity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditActivityComponent implements OnInit {

    programId: number;
    activityId: number;
    programName$: Observable<string>;
    activity$: Observable<Activity>;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.programId = parseInt(this.route.snapshot.params['programId'], 10);
        this.activityId = parseInt(this.route.snapshot.params['activityId'], 10);
        this.programName$ = this.store.select(ProgramsState.selectProgramName).pipe(map(fn => fn(this.programId)));
        this.activity$ = this.store.select(ActivitiesState.selectActivityByActivityId).pipe(map(fn => fn(this.activityId)));
    }

    onSubmitted(x: Activity) {
        this.store.dispatch(new EditActivity(this.activityId, x, this.programId));
    }

}
