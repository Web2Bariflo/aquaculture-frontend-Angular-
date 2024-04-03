import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-noview-account',
  templateUrl: './noview-account.component.html',
  styleUrls: ['./noview-account.component.css']
})
export class NoviewAccountComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NoviewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 4000);
  }
}