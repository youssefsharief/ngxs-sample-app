import { State, Action, StateContext, Selector } from '@ngxs/store';

import { ApiService } from 'src/app/core/services/api.service';

// Actions
export class ChangeProgramPage {
    static readonly type = '[UI] [Programs] Change page';
    constructor(public pageNumber: number) { }
}
// export class ChangeActivitiesPage {
//   static readonly type = '[UI] [Activities] Change page';
//   constructor(public payload: {programId: number, pageNumber: number}) { }
// }

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

    @Action(ChangeProgramPage)
    changeProgramPage(ctx: StateContext<UIStateModel>, action: ChangeProgramPage) {
        ctx.patchState({
            programsPageNumber: action.pageNumber
        });
    }

}