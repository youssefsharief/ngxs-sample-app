import { State, Action, StateContext, Selector } from '@ngxs/store';

import { ProgramsState, FetchPrograms } from './programs/programs.state';
import { FetchActivities, ActivitiesState } from './activities/activities.state';
import { UIState } from './ui/ui.state';

// Actions
export class FetchData {
  static readonly type = '[API] Fetch Data';
}

// Models
export interface AppStateModel {

}

@State<AppStateModel>({
  name: 'appstate',
  defaults: {
  },
  children: [ProgramsState, ActivitiesState, UIState]
})
export class AppState {
  constructor() { }

  @Action(FetchData)
  fetchData(ctx: StateContext<AppStateModel>) {
    ctx.dispatch([new FetchPrograms(), new FetchActivities]);
  }
}