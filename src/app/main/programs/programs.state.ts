import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { Program } from 'src/app/core/models/program';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedStateModel, SharedState } from 'src/app/shared/shared.state';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { of } from 'rxjs';
import { FetchData } from 'src/app/shared/shared.actions';

// Actions


// Models
export interface ProgramsStateModel {
  programs: Program[];
}

@State<ProgramsStateModel>({
  name: 'programsstate',
  defaults: {
    programs: []
  }
})
export class ProgramsState {
  constructor(private api: ApiService, private sb: SnackBarService) { }

  @Selector([SharedState])
  static selectTenPrograms(state: ProgramsStateModel, sharedState: SharedStateModel) {
    const firstIndex = (sharedState.programsPageNumber - 1) * 10;
    return state.programs.slice(firstIndex, firstIndex + 10);
  }

  @Selector()
  static selectProgramsCount(state: ProgramsStateModel) {
    return state.programs.length;
  }

  @Selector()
  static selectProgramName(state: ProgramsStateModel) {
    return (programId: number) => {
      const program = state.programs.find((program: Program) => program.id === programId);
      return program ? program.name : '';
    };
  }

  @Action(FetchData)
  fetchData(ctx: StateContext<ProgramsStateModel>) {
    return this.api.getPrograms().pipe(
      tap((programs: Program[]) => {
        const state = ctx.getState();
        ctx.patchState({
          programs: programs
        });
      }),
      catchError(err => {
        this.sb.emitErrorSnackBar();
        return of([]);
      })
    );
  }

}