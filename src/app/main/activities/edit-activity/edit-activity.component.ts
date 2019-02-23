import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Activity } from 'src/app/core/models/Activity';

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
        // private store: Store<State>,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.programId = parseInt(this.route.snapshot.params['programId'], 10);
        this.activityId = parseInt(this.route.snapshot.params['activityId'], 10);
        // this.programName$ = this.store.pipe(select(selectProgramName(this.programId)));
        // this.activity$ = this.store.pipe(select(selectActivityByActivityId(this.activityId)));
    }

    onSubmitted(x: Activity) {
        // this.store.dispatch(new EditActivity(this.activityId, this.programId, x));
    }

}
