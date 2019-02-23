import { NgModule } from '@angular/core';
import { ActivitiesModule } from './activities/activities.module';
import { ProgramsModule } from './programs/programs.module';

@NgModule({
  imports: [
    ActivitiesModule,
    ProgramsModule
  ],
  providers: [],
  exports: [
  ],
  declarations: [
    
  ]
})
export class MainModule { }
