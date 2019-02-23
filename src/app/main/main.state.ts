import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';

import { Program } from '../core/models/program';
import { FetchData } from './main.actions';
import { ApiService } from '../core/services/api.service';
import { ChangeProgramPage } from './ui/ui.actions';
import * as fromUIState  from './ui/ui.state';

export interface AppStateModel {

  programs: Program[];

  // activities: fromActivities.State;

  ui: fromUIState.UIState;

}

@State<AppStateModel>({
  name: 'appstate',
  defaults: {
    programs: [],
    ui: fromUIState.initialState
  }
})
export class AppState {
  constructor(private api: ApiService) {}

  @Action(FetchData)
  fetchData(ctx: StateContext<AppStateModel>) {
    return this.api.getPrograms().pipe(
      tap((programs: Program[]) => {
        ctx.patchState({
          programs: programs
        });
      })
    );
  }

  // TODO use another memoized selector to get programs
  @Selector() 
  static selectTenPrograms(state: AppStateModel) {
    const firstIndex = (state.ui.programsPageNumber - 1) * 10;
    return state.programs.slice(firstIndex, firstIndex + 10);
  }

   // TODO use another memoized selector to get programs
   @Selector() 
   static selectProgramsCount(state: AppStateModel) {
     return state.programs.length;
   }

  //TODO move to it's own state
  @Action(ChangeProgramPage)
  changeProgramPage(ctx: StateContext<AppStateModel>, action: ChangeProgramPage) {
    const state = ctx.getState();
    ctx.patchState({
      ui: {
        ...state.ui,
        programsPageNumber: action.pageNumber
      }
    });
  }

}