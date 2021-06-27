import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  AfterViewInit,
  NgZone,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventAction, EventColor } from 'calendar-utils';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-component',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./full-calendar.styles.css'],
  templateUrl: './full-calendar.template.html',
})
export class FullCalendarComponent implements OnInit {
  calendarLoaded: boolean = true;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  newCalendarEvent: CalendarEvent;

  viewDate: Date = new Date();
  // events: CalendarEvent[] = [];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [{id:1, start:(new Date("2021-01-07 10:15:25-07")), title:"A first entry","draggable":true}];

  /*events: CalendarEvent[] = [
  {
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions,
    allday: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
  {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions,
  },
  {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue,
    allday: true,
  },
  {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow,
    actions: this.actions,
  },
  {
    start: addHours(startOfDay(new Date()), 2),
    end: addHours(new Date(), 2),
    title: 'A draggable and resizable event',
    color: colors.yellow,
    actions: this.actions,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,
  },
];*/

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private http: HttpClient,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.ngZone.run(() => {
      this.getEvents();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  getEvents(): void {
    this.http
      .get(environment.backendApiPath + '/showCalendarEvents', {
        responseType: 'json',
      })
      .subscribe(
        (events: any) => {
          this.events = events.map((ev) => {
            return {
              id: ev.id,
              start: new Date(ev.start),
              end: new Date(ev.end),
              title: ev.title,
              color: colors.red,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              allDay: ev.allDay,
              draggable: ev.draggable,
            };
          });
          console.log(this.events);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addEvent(): void {
    this.newCalendarEvent = {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
    };
    this.http
      .post(
        environment.backendApiPath + '/addCalendarEvent',
        this.newCalendarEvent,
        {}
      )
      .subscribe(
        (value) => {
          console.log(`send messages with ${this.newCalendarEvent}`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.ngZone.run(() => {
            this.getEvents();
          });
        }
      );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.http
      .delete(environment.backendApiPath + '/deleteEvent/' + eventToDelete.id)
      .subscribe(
        (value) => {
          console.log(`send delete message with ${eventToDelete.id}`);
          // this.events = this.events.filter((event) => event !== eventToDelete);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.ngZone.run(() => {
            this.getEvents();
          });
        }
      );
  }

  updateEvent(eventToUpdate: CalendarEvent): void {
    // this.events = this.events.filter((event) => event !== eventToUpdate);
    this.http
      .put(
        environment.backendApiPath + '/updateEvent/' + eventToUpdate.id,
        eventToUpdate,
        {}
      )
      .subscribe(
        (value) => {
          console.log(`send updateEvent with ${eventToUpdate}`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.ngZone.run(() => {
            this.getEvents();
          });
        }
      );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
