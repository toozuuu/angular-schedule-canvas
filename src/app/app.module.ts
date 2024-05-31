import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScheduleCanvasComponent } from './schedule-canvas/schedule-canvas.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'schedule', component: ScheduleCanvasComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ScheduleCanvasComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
