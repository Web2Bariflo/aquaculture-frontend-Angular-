import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// add-event-dialog.component.ts
export interface AddEventDialogResult {
  eventTitle: string;
  eventDate: string; // Adjust the type accordingly
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent implements OnInit {
  eventTitle: string = ''; 
  eventDate: string = ''; 
  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Use the data.clickEvent to position the dialog
    if (this.data.clickEvent) {
      const rect = this.data.clickEvent.target.getBoundingClientRect();
      const top = rect.top + 'px';
      const left = rect.left + 'px';

      this.dialogRef.updatePosition({ top: top, left: left });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}