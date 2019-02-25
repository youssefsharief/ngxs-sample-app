import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';

import { ApiService } from 'src/app/core/services/api.service';

// Actions
export class ChangeProgramPage {
    static readonly type = '[UI] [Programs] Change page';
    constructor(public pageNumber: number) { }
}
export class ChangeActivitiesPage {
  static readonly type = '[UI] [Activities] Change page';
  constructor(public programId: number, public pageNumber: number) { }
}

// Models
export interface UIStateModel {
    programsPageNumber: number;
    activitiesPageNumber: { [s: string]: number; };
}

@State<UIStateModel>({
    name: 'uistate',
    defaults: {
        programsPageNumber: 1,
        activitiesPageNumber: {}
    }
})
export class UIState {
    constructor(private api: ApiService) { }

    static selectAtivitiesPageNumber(programId: number) {
        return createSelector(
            [UIState],
            (state: UIStateModel) => {
                return state.activitiesPageNumber[programId] || 1;
            }
        );
    }

    @Action(ChangeProgramPage)
    changeProgramPage(ctx: StateContext<UIStateModel>, action: ChangeProgramPage) {
        ctx.patchState({
            programsPageNumber: action.pageNumber
        });
    }

    @Action(ChangeActivitiesPage)
    changeActivitiesPage(ctx: StateContext<UIStateModel>, action: ChangeActivitiesPage) {
        const state = ctx.getState();
        ctx.patchState({
            activitiesPageNumber: {
                ...state.activitiesPageNumber,
                [action.programId]: action.pageNumber  
            }
        });
    }
}