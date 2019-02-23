export interface UIState {
    programsPageNumber: number;
    activitiesPageNumber: { [s: string]: number; };
}

export const initialState: UIState = {
    programsPageNumber: 1,
    activitiesPageNumber: {}
};
