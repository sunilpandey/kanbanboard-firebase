import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskEntryComponent } from './task-list/task-entry/task-entry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'kanbanboard';
  tasks: any;
  constructor(private dialog: MatDialog) { }
  ngOnInit() {   
    let data = "hello24";
    
    // let result = Array.from()[0].groups.taskNumber

  }
}
