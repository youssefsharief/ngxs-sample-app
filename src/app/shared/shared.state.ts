import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';

import { ApiService } from '../core/services/api.service';

// Actions
export class FetchData {
    static readonly type = '[API] Fetch Data';
}

export class ChangeProgramPage {
    static readonly type = '[UI] [Programs] Change page';
    constructor(public pageNumber: number) { }
}
export class ChangeActivitiesPage {
  static readonly type = '[UI] [Activities] Change page';
  constructor(public programId: number, public pageNumber: number) { }
}

// Models
export interface SharedStateModel {
    programsPageNumber: number;
    activitiesPageNumber: { [s: string]: number; };
}

@State<SharedStateModel>({
    name: 'sharedstate',
    defaults: {
        programsPageNumber: 1,
        activitiesPageNumber: {}
    }
})
export class SharedState {
    constructor(private api: ApiService) { }

    @Selector() 
    static selectAtivitiesPageNumber(state: SharedStateModel) {
        return (programId: number) => {
            return state.activitiesPageNumber[programId] || 1;
        };
    }
    
    @Action(ChangeProgramPage)
    changeProgramPage(ctx: StateContext<SharedStateModel>, action: ChangeProgramPage) {
        ctx.patchState({
            programsPageNumber: action.pageNumber
        });
    }

    @Action(ChangeActivitiesPage)
    changeActivitiesPage(ctx: StateContext<SharedStateModel>, action: ChangeActivitiesPage) {
        const state = ctx.getState();
        ctx.patchState({
            activitiesPageNumber: {
                ...state.activitiesPageNumber,
                [action.programId]: action.pageNumber  
            }
        });
    }
}