import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { ITask } from './itask';
import { concatMap } from "rxjs/operators"
import { Observable, of } from 'rxjs';

@Injectable()
export class TasklistService {
  private _tasksCollection!: AngularFirestoreCollection<ITask>;
  private _taskList: Observable<ITask[]> = of([])
  constructor(private readonly _fireStore: AngularFirestore, private _activatedRoute: ActivatedRoute) { 
    this.initTasks();  
  }
  
  public initTasks() {
    this._activatedRoute.params.pipe(concatMap((params: Params) => {
      let boardName = params["boardname"]
      this._tasksCollection =  this._fireStore.collection<ITask>('Boards').doc(boardName).
            collection<ITask>("Tasks", ref => {
                return ref.orderBy("title")
            });
      return this._tasksCollection.valueChanges();
    })).subscribe((taskList: ITask[]) => {
      this._taskList = of(taskList);
    });    
  }

  public get taskList() {
    return this._taskList;
  }

  public async addUpdateTask(task: ITask) {
    if(!task.id) {
      delete task.id;
      let doc = await this._tasksCollection.add(task)
      task.id = doc.id;
    }
    this._tasksCollection.doc(task.id).set(task, {merge: true});
  }

  public removeTask(task: ITask) {
    this._tasksCollection.doc(task.id).delete();
  }
}
