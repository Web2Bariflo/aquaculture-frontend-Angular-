
import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventInput, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component'; // create a new component for the dialog
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  events: EventInput[] = [
    { id: this.generateUniqueId(), title: 'event 1', date: '2024-02-29' },
    { id: this.generateUniqueId(), title: 'event 2', date: '2024-04-02' }
  ];
  calendarOptions !: CalendarOptions;

  // Declare the eventTitle property
  eventTitle: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: this.events
    };
  }

  handleDateClick(res: { dateStr: string; jsEvent: MouseEvent}) {
    // Open the dialog to add a new event
    this.openAddEventDialog(res.dateStr, res.jsEvent);
  }

  handleEventClick(arg: any) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(event => event.id !== arg.event.id);
      this.calendarOptions.events = this.events;
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  openAddEventDialog(dateStr:any, clickEvent: MouseEvent): void {
    const dialogRef = this.dialog.open<AddEventDialogComponent, any>(AddEventDialogComponent, {
      width: '250px',
      data: {
        date:dateStr,
        clickEvent: clickEvent
      } // You can pass data to the dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newEvent: EventInput = {
          id: this.generateUniqueId(),
          title: result,
          date: dateStr
        };

        this.events = [...this.events, newEvent];
        this.calendarOptions.events = this.events;
      }
    });
  }
}

