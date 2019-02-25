import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/api.service';
import { UIStateModel, UIState } from '../ui/ui.state';
import { Activity } from 'src/app/core/models/activity';
import { addProgramIdProp } from 'src/app/core/services/utility';

// Actions
export class FetchActivities {
  static readonly type = '[API] Fetch Activities';
}

// Models
export interface ActivitiesStateModel {
  activities: Activity[];
}

@State<ActivitiesStateModel>({
  name: 'activitiesstate',
  defaults: {
    activities: []
  }
})
export class ActivitiesState {
  constructor(private api: ApiService) { }

  static selectProgramActivities(programId: number) {
    return createSelector(
      [ActivitiesState],
      (state: ActivitiesStateModel) => {
        return state.activities.filter((activity: Activity) => activity.programId === programId);
      }
    );
  }

  static selectTenActivities(programId: number) {
    return createSelector(
      [ActivitiesState, UIState],
      (state: ActivitiesStateModel, uiState: UIStateModel) => {
        const firstIndex = (UIState.selectAtivitiesPageNumber(programId)(uiState) - 1) * 10;
        return this.selectProgramActivities(programId)(state).slice(firstIndex, firstIndex + 10);
      }
    );
  }

  static selectActivitiesCount(programId: number) {
    return createSelector(
      [ActivitiesState],
      (state: ActivitiesStateModel) => {
        return this.selectProgramActivities(programId)(state).length;
      }
    );
  }

  @Action(FetchActivities)
  fetchData(ctx: StateContext<ActivitiesStateModel>) {
    return this.api.getActivities().pipe(
      tap((activities: Activity[]) => {
        ctx.patchState({
          activities: activities.map(activity => addProgramIdProp(activity))
        });
      })
    );
  }

}