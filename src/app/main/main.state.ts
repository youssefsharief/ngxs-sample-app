import { State, Action, StateContext } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs/operators';

import { Program } from '../core/models/program';
import { FetchData } from './main.actions';
import { ApiService } from '../core/services/api.service';

export interface AppStateModel {

  programs: Program[];

  // activities: fromActivities.State;

  // ui: fromUi.State;

}

@State<AppStateModel>({
  name: 'appstate',
  defaults: {
    programs: []
  }
})
export class AppState {
  constructor(private api: ApiService) {}

  @Action(FetchData)
  fetchData(ctx: StateContext<AppStateModel>) {
    return this.api.getPrograms().pipe(
      tap((programs: Program[]) => {
        ctx.setState({
          ...ctx.getState(),
          programs: programs
        });
      })
    );
  }
}