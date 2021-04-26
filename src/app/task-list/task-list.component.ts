import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasklistService } from './tasklist.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog"
import { TaskEntryComponent } from "./task-entry/task-entry.component"
import { CdkDragDrop } from "@angular/cdk/drag-drop"
import { ITask } from './itask';
import { element } from 'protractor';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.less'],
  providers: [TasklistService]
})
export class TaskListComponent implements OnInit {
  constructor(public readonly taskListService: TasklistService, 
      private readonly dialog: MatDialog) { 
  }

  ngOnInit(): void {
  }

  public addButtonClicked() {
    this.openTaskEntryDialog();
  }

  public editButtonClicked(task: ITask) {
    this.openTaskEntryDialog(task);
  }

  public deleteButtonClicked(task: ITask) {
    this.taskListService.removeTask(task);
  }

  public openTaskEntryDialog(task?: ITask) {
    const dialogRef: MatDialogRef<TaskEntryComponent> = this.dialog.open(TaskEntryComponent)
    this.taskListService.taskList.subscribe(tasks => {
      dialogRef.componentInstance.id = tasks.length + 1 + ""
    });
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.taskListService = this.taskListService;
    dialogRef.componentInstance.closedWithSaveButton.subscribe((saveButtonClicked: boolean) => {
      console.log("Save Button clicked: ", saveButtonClicked)
      dialogRef.close();
    });
  }

  public changeTaskStatus(task: ITask, status: string) {
    task.status = status;
    this.taskListService.addUpdateTask(task);
  }
  private dragTask: ITask | undefined;
  dragStart(task: ITask) {
    this.dragTask = task;
  }

  dragOver(element: HTMLDivElement, listType: string, $event: DragEvent, ) {
    $event.preventDefault();
    if(this.dragTask?.status !== listType) {
      console.log(this.dragTask?.status);
      (element as HTMLElement).classList.add('drag-over');
    }
  }

  dragLeave(element: HTMLDivElement, listType: string) {
      element.classList.remove('drag-over');
  }

  dragEnd() {
      // this.dragTask = undefined;
  }
  drop(element: HTMLDivElement, listType: string) {
      element.classList.remove('drag-over')
      if(this.dragTask) {
        this.changeTaskStatus(this.dragTask, listType);
      }
  }
}
