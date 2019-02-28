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