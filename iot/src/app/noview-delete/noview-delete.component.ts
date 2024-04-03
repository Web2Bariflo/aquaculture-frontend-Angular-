import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-noview-delete',
  templateUrl: './noview-delete.component.html',
  styleUrls: ['./noview-delete.component.css']
})
export class NoviewDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NoviewDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }
}