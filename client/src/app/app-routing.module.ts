import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoodEntryComponent } from './mood-entry/mood-entry.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: MoodEntryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
