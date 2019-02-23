import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Activity } from 'src/app/core/models/Activity';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-activity',
    templateUrl: './add-activity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddActivityComponent implements OnInit {
    programId: number;
    programName$: Observable<string>;

    constructor(
        // private store: Store<State>,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.programId = parseInt(this.route.snapshot.params['programId'], 10);
        // this.programName$ = this.store.pipe(select(selectProgramName(this.programId)));
    }

    onSubmitted(x: Activity) {
        // this.store.dispatch(new AddActivity(x, this.programId));
    }


}
