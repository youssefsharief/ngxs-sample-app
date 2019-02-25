import { State, Action, StateContext, Selector, createSelector, Store } from '@ngxs/store';
import { tap, map, catchError } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/api.service';
import { SharedStateModel, SharedState, FetchData } from 'src/app/shared/shared.state';
import { Activity } from 'src/app/core/models/activity';
import { addProgramIdProp, addWorkflowLevel1Prop } from 'src/app/core/services/utility';
import { of } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

// Actions
export class DeleteActivity {
  static readonly type = '[API] Delete Activity';
  constructor(public activityId: number) { }
}
export class AddActivity {
  static readonly type = '[API] Add Activity';
  constructor(public activity: Activity, public programId: number) { }
}
export class EditActivity {
  static readonly type = '[API] Edit Activity';
  constructor(public activityId: number, public activity: Activity, public programId: number) { }
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
  constructor(private api: ApiService, private sb: SnackBarService) { }

  @Selector()
  static selectActivityByActivityId(state: ActivitiesStateModel) {
    return (activityId: number) => {
      return state.activities.find((activity: Activity) => activity.id === activityId);
    };
  }

  @Selector()
  static selectProgramActivities(state: ActivitiesStateModel) {
    return (programId: number) => {
      return state.activities.filter((activity: Activity) => activity.programId === programId);
    };
  }

  @Selector([SharedState])
  static selectTenActivities(state: ActivitiesStateModel, sharedState: SharedStateModel) {
    return (programId: number) => {
      const pageNumber = SharedState.selectAtivitiesPageNumber(sharedState)(programId);
      const firstIndex = (pageNumber - 1) * 10;
      return this.selectProgramActivities(state)(programId).slice(firstIndex, firstIndex + 10);
    };
  }

  @Selector()
  static selectActivitiesCount(state: ActivitiesStateModel) {
    return (programId: number) => {
      return this.selectProgramActivities(state)(programId).length;
    };
  }

  @Action(FetchData)
  fetchData(ctx: StateContext<ActivitiesStateModel>) {
    return this.api.getActivities().pipe(
      tap((activities: Activity[]) => {
        ctx.patchState({
          activities: activities.map(activity => addProgramIdProp(activity))
        });
      }),
      catchError(err => {
        this.sb.emitErrorSnackBar();
        return of([]);
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
          activities: [...state.activities, addProgramIdProp(activity)]
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
        const activities = [...state.activities];
        activities[index] = addProgramIdProp(activity);
        ctx.patchState({
          activities: activities
        });
      })
    );
  }

}