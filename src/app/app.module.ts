import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire"
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { TaskEntryComponent } from './task-list/task-entry/task-entry.component'
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button"
import { MatDividerModule } from "@angular/material/divider"
import { MatDialogModule } from "@angular/material/dialog"
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { BoardListComponent } from './board-list/board-list.component';
import { AppRoutingModule } from './app-routing.module'
import { MatCardModule } from "@angular/material/card";
import { TaskListComponent } from './task-list/task-list.component';
import { TaskStatusPipe } from './task-list/task-status.pipe'
import { MatIconModule } from "@angular/material/icon"
@NgModule({
  declarations: [
    AppComponent,
    TaskEntryComponent,
    BoardListComponent,
    TaskListComponent,
    TaskStatusPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatInputModule,
    MatCommonModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
