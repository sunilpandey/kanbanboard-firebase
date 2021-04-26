import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BoardListComponent } from './board-list/board-list.component';
import { TaskEntryComponent } from './task-list/task-entry/task-entry.component';
import { TaskListComponent } from './task-list/task-list.component';

let routes: Routes = [
  {path: '', component: BoardListComponent},
  {path: "board/:boardname", component: TaskListComponent, }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
