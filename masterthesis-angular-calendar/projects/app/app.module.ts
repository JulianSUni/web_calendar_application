import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbTabsetModule,
  NgbCollapseModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { AppComponent } from './app.component';
import { FullCalendarComponent } from './modules/full-calendar-component/full-calendar.component';
import { FullCalendarModule } from './modules/full-calendar-component/full-calendar.module';
import { environment } from './environments/environment';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbTabsetModule,
    NgbCollapseModule,
    HttpClientModule,
    HttpModule,
    NgbTooltipModule,
    DragAndDropModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
    }),
    ClipboardModule,
    FullCalendarModule,
    RouterModule.forRoot(
      [
        {
          path: 'full-calendar-component',
          component: FullCalendarComponent,
          data: {
            label: 'Kitchen sink',
          },
        },
        {
          path: '**',
          redirectTo: 'full-calendar-component',
        },
      ],
      {
        useHash: true,
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
