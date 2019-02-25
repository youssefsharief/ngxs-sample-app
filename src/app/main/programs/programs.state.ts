import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Program } from 'src/app/core/models/program';
import { ApiService } from 'src/app/core/services/api.service';
import { UIStateModel, UIState } from '../ui/ui.state';

// Actions
export class FetchPrograms {
  static readonly type = '[API] Fetch Programs';
}

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
  constructor(private api: ApiService) { }

  @Selector([UIState])
  static selectTenPrograms(state: ProgramsStateModel, uiState: UIStateModel) {
    const firstIndex = (uiState.programsPageNumber - 1) * 10;
    return state.programs.slice(firstIndex, firstIndex + 10);
  }

  @Selector()
  static selectProgramsCount(state: ProgramsStateModel) {
    return state.programs.length;
  }

  static selectProgramName(programId: number) {
    return createSelector(
      [ProgramsState],
      (state: ProgramsStateModel) => {
        const program = state.programs.find((program: Program) => program.id === programId);
        return program ? program.name : '';
      }
    );
  }

  @Action(FetchPrograms)
  fetchData(ctx: StateContext<ProgramsStateModel>) {
    return this.api.getPrograms().pipe(
      tap((programs: Program[]) => {
        const state = ctx.getState();
        ctx.patchState({
          programs: programs
        });
      })
    );
  }

}