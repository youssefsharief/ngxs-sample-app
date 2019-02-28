import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/core/models/program';
import { Store, Select } from '@ngxs/store';
import { ProgramsState } from '../programs.state';
import { ChangeProgramPage } from 'src/app/shared/shared.actions';

@Component({
    selector: 'app-programs-list',
    templateUrl: './programs-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramsListComponent implements OnInit {

    @Select(ProgramsState.selectTenPrograms) programs$: Observable<Program[]>;
    @Select(s => s.sharedstate.programsPageNumber) currentPage$: Observable<number>;
    @Select(ProgramsState.selectProgramsCount) programsCount$: Observable<number>;
    constructor(private store: Store) { }

    ngOnInit() {
    }

    changePage(e: {page: number}) {
        this.store.dispatch(new ChangeProgramPage(e.page));
    }

    hasActivities(programId) {
        // return this.store.pipe(select(doesProgramHaveActivities(programId)));
    }
}
