import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfigurationCustomTypesPerDataset, ChartDataCustomTypesPerDataset, ChartDatasetCustomTypesPerDataset, ChartItem } from 'chart.js/auto';
import { IBudgetData } from 'src/app/interfaces/IBudgetData';
import { BudgetDataService } from 'src/app/services/budget-data.service';
import { ChartService } from 'src/app/services/chart.service';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements OnInit {
  public title: string = 'Weekly Breakdown';

  private weekStart: Date = new Date();
  private weekEnd: Date = new Date();

  private budgetData: IBudgetData[] = [];
  private displayData: IBudgetData[] = [];
  private remaining: number[] = [];
  private expenses: number[] = [];
  private labels: string[] = [];
  private remDataset!: ChartDatasetCustomTypesPerDataset;
  private expDataset!: ChartDatasetCustomTypesPerDataset;
  private chart!: Chart;

  public displayWeekStart: string = "";
  public displayWeekEnd: string = "";

  // ICONS
  public leftChevron = faChevronCircleLeft;
  public rightChevron = faChevronCircleRight;

  constructor(
    private budgetDataService: BudgetDataService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.weekStart = this.getSundayPriorToDate(new Date());
  
    this.weekEnd = new Date(this.weekStart);
    this.weekEnd.setDate(this.weekEnd.getDate() + 6);

    this.budgetDataService.getBudgetData().subscribe(subData => {
      this.budgetData = subData;

      const item: ChartItem = <ChartItem>document.getElementById('total-line-chart');

      this.getDataArrays();
  
      let data: ChartDataCustomTypesPerDataset = this.chartService.buildChartData(
        [this.remDataset, this.expDataset],
        this.labels
      );
    
      const config: ChartConfigurationCustomTypesPerDataset = this.chartService.buildChartConfig(data);

      this.chart = this.chartService.displayChart(item, config);
    });
  }

  private getSundayPriorToDate(curr_day: Date): Date {
    let daysDiff: number = 0 - curr_day.getDay();
    let firstSunday: Date = new Date(curr_day);
    firstSunday.setDate(firstSunday.getDate() + daysDiff);

    return firstSunday;
  }

  private getDataArrays(): void {
    let dates: string[] = [];
    this.remaining = [];
    this.expenses = [];
    this.displayData = [];

    this.displayWeekStart = this.weekStart.toLocaleDateString();
    this.displayWeekEnd = this.weekEnd.toLocaleDateString();

    this.displayData = this.budgetData.filter(d => {
      let curr: Date = new Date(d.date);
      curr.setMinutes(curr.getMinutes() + curr.getTimezoneOffset());

      return this.displayWeekStart <= curr.toLocaleDateString() && curr.toLocaleDateString() <= this.displayWeekEnd
    });

    for(let i = 0; i <= 6; i++) {
      let day: Date = new Date(this.weekStart);
      day.setDate(day.getDate() + i);
      dates.push(day.toLocaleDateString());

      let match: IBudgetData | undefined = this.displayData.find(d => {
        let comp: Date = new Date(d.date);
        comp.setMinutes(comp.getMinutes() + comp.getTimezoneOffset());
        return comp.toLocaleDateString() === day.toLocaleDateString();
      });

      if (match) {
        this.remaining.push(match.remaining);
        this.expenses.push(match.amount);
      } else {
        let addition: IBudgetData = {
          date: day.toLocaleDateString(),
          bill: "",
          amount: 0,
          remaining: 0
        };

        if (this.withinRange()) {

          let lastRem: number | null = null;
          let offset: number = 0;

          while (lastRem === null) {
            let comp: Date = new Date(day);
            comp.setDate(comp.getDate() + offset);

            let foundLastRem: IBudgetData | undefined = this.budgetData.find(d => {
              let curr: Date = new Date(d.date);
              curr.setMinutes(curr.getMinutes() + curr.getTimezoneOffset());
              return curr.toLocaleDateString() === comp.toLocaleDateString();
            });

            if (foundLastRem) {
              lastRem = foundLastRem.remaining;
            } else {
              offset--;
            }

            if (offset < -30) {
              lastRem = 0;
            }
          }

          this.remaining.push(lastRem);
          addition.remaining = lastRem;
        } else {
          this.remaining.push(0);
        }

        this.expenses.push(0);
        this.budgetData.push(addition);
      }
    }

    this.labels = dates;
    this.remDataset = this.chartService.createLineChartDataset(
      'Remaining',
      this.remaining
    );

    this.expDataset = this.chartService.createBarChartDataset(
      'Expenses',
      this.expenses
    );
  }

  public updateDates(moveInterval: number): void {
    // Move week forward or backward
    this.weekStart.setDate(this.weekStart.getDate() + moveInterval);
    this.weekEnd.setDate(this.weekEnd.getDate() + moveInterval);

    this.getDataArrays();

    this.chart.data.labels = this.labels;
    this.chart.data = this.chartService.buildChartData(
      [this.remDataset, this.expDataset],
      this.labels
    );
    this.chart.update();
  }

  public withinRange(): boolean {
    let first: IBudgetData | undefined = this.budgetData.at(0);

    if (first) {
      let earliest: Date = new Date(first.date);

      if (earliest.toLocaleDateString() <= this.weekStart.toLocaleDateString()) {
        return true;
      }
    }

    return false;
  }
}
