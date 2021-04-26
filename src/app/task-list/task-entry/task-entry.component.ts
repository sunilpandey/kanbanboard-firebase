import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ITask } from '../itask';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-task-entry',
  templateUrl: './task-entry.component.html',
  styleUrls: ['./task-entry.component.less']
})
export class TaskEntryComponent implements OnInit {
  public statusOptions = ["Open", "In Progress", "Closed"];
  public formGroup!: FormGroup;
  public closedWithSaveButton: Observable<boolean> = new Observable((subscriber) => {
    this.subscriber = subscriber;
  });
  private subscriber!: Subscriber<boolean>;
  public id: string= "";
  public taskListService!: TasklistService;
  private _task: ITask | undefined;
  
  constructor(private _formBuilder: FormBuilder) { 
    
  }

  public set task(taskParam: ITask | undefined) {
    this._task = taskParam;
  }

  public get task(): ITask | undefined {
    return this._task;
  }
  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      title: [
        this.task?.title, Validators.compose([Validators.required, Validators.maxLength(40)])
      ],
      description: [
        this.task?.description, Validators.required
      ],
      status: [
        this.task?.status, Validators.required
      ],
      estimation: [
        this.task?.estimate, Validators.pattern("^[0-9]*")
      ]
    });
  }

  public saveButtonClicked(): void {
    if(this.formGroup.valid) {
      let task = {
        id: this._task?.id,
        title: this.formGroup.controls.title.value,
        description: this.formGroup.controls.description.value,
        status: this.formGroup.controls.status.value,
        estimate: this.formGroup.controls.estimation.value
      }
      this.taskListService.addUpdateTask(task as ITask);
      this.subscriber.next(true);
    }
  }

  public cancelButtonClicked(): void {
    this.subscriber.next(false);
  }

}
