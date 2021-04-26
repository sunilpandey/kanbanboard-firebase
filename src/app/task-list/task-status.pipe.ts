import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask } from './itask';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: Observable<ITask[]>, status: string): Observable<ITask[]> {
    return value.pipe(map((tasks: ITask[]) => {
      return tasks.filter(tasks => tasks.status == status)
    }));
  }

}
