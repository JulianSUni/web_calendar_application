import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarComponent } from './full-calendar.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    HttpClientModule,
    HttpModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [FullCalendarComponent],
  exports: [FullCalendarComponent],
})
export class FullCalendarModule {}
