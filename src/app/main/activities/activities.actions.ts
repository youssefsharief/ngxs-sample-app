import { Activity } from 'src/app/core/models/activity';

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