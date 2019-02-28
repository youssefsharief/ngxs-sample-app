import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';

import { ChangeProgramPage, ChangeActivitiesPage } from './shared.actions';


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
    constructor() { }

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