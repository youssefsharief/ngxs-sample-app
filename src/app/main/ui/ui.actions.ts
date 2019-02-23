export class ChangeProgramPage {
  static readonly type = '[UI] [Programs] Change page';
  constructor(public pageNumber: number) { }
}

// export class ChangeActivitiesPage {
//   static readonly type = '[UI] [Activities] Change page';
//   constructor(public payload: {programId: number, pageNumber: number}) { }
// }