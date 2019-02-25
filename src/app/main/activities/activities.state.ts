import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/api.service';
import { UIStateModel, UIState } from '../ui/ui.state';
import { Activity } from 'src/app/core/models/activity';
import { addProgramIdProp, addWorkflowLevel1Prop } from 'src/app/core/services/utility';

// Actions
export class FetchActivities {
  static readonly type = '[API] Fetch Activities';
}
export class DeleteActivity {
  static readonly type = '[API] Delete Activity';
  constructor(public activityId: number) {}
}
export class AddActivity {
  static readonly type = '[API] Add Activity';
  constructor(public activity: Activity, public programId: number) {}
}
export class EditActivity {
  static readonly type = '[API] Edit Activity';
  constructor(public activityId: number, public activity: Activity, public programId: number) {}
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

  static selectActivityByActivityId(activityId: number) {
    return createSelector(
      [ActivitiesState],
      (state: ActivitiesStateModel) => {
        return state.activities.find((activity: Activity) => activity.id === activityId);
      }
    );
  }

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

  @Action(DeleteActivity)
  deleteActivity(ctx: StateContext<ActivitiesStateModel>, action: DeleteActivity) {
    return this.api.deleteActivity(action.activityId).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          activities: state.activities.filter(activity => activity.id !== action.activityId)
        });
      })
    );
  }

  @Action(AddActivity)
  addActivity(ctx: StateContext<ActivitiesStateModel>, action: AddActivity) {
    return this.api.addActivity(addWorkflowLevel1Prop(action.activity, action.programId)).pipe(
      tap((activity: Activity) => {
        const state = ctx.getState();
        ctx.patchState({
          activities: [ ...state.activities, addProgramIdProp(activity) ]
        });
      })
    );
  }

  @Action(EditActivity)
  editActivity(ctx: StateContext<ActivitiesStateModel>, action: EditActivity) {
    return this.api.updateActivity(action.activityId, addWorkflowLevel1Prop(action.activity, action.programId)).pipe(
      tap((activity: Activity) => {
        const state = ctx.getState();
        const index = state.activities.findIndex(activity => activity.id === action.activityId);
        const activities = [ ...state.activities ];
        activities[index] = addProgramIdProp(activity);
        ctx.patchState({
          activities: activities
        });
      })
    );
  }

}