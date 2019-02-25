import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppInputsModule } from './components/ui-inputs/inputs.module';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    AppInputsModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppInputsModule,
    TitleComponent,
    PaginationModule
  ],
  declarations: [
    TitleComponent
  ]
})
export class SharedModule { }
