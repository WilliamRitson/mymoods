import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoodEntryComponent } from './mood-entry/mood-entry.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: MoodEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
