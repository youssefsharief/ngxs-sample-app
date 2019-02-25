import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';
import { AppState } from './main/main.state';
import { ProgramsState } from './main/programs/programs.state';
import { UIState } from './main/ui/ui.state';
import { ActivitiesState } from './main/activities/activities.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState, ProgramsState, ActivitiesState, UIState], { developmentMode: !environment.production }),
    
    NgProgressModule,
    NgProgressHttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
