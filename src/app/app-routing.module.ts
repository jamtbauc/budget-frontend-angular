import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklyChartComponent } from './components/weekly-chart/weekly-chart.component';

const routes: Routes = [
  { path: "weekly-chart", component: WeeklyChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
