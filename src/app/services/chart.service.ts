import { Injectable } from '@angular/core';
import { Chart, ChartConfigurationCustomTypesPerDataset, ChartDataCustomTypesPerDataset, ChartDatasetCustomTypesPerDataset, ChartItem, ChartOptions } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private options: ChartOptions = {
    responsive: true,
    aspectRatio: 3
  };

  constructor() { }

  public createLineChartDataset(
    label: string,
    data: number[]
  ): ChartDatasetCustomTypesPerDataset {
    let json: ChartDatasetCustomTypesPerDataset = {
      type: 'line',
      label: label,
      data: data
    };

    return json;
  }

  public createBarChartDataset(
    label: string,
    data: number[]
  ): ChartDatasetCustomTypesPerDataset {

    let json: ChartDatasetCustomTypesPerDataset = {
      type: 'bar',
      label: label,
      data: data
    };

    return json;
  }

  public buildChartData(
    datasets: ChartDatasetCustomTypesPerDataset[],
    labels: string[]
  ): ChartDataCustomTypesPerDataset {

    let json: ChartDataCustomTypesPerDataset = {
      datasets: datasets,
      labels: labels
    };

    return json;
  }

  public buildChartConfig(
    data: ChartDataCustomTypesPerDataset
  ): ChartConfigurationCustomTypesPerDataset {

    let json: ChartConfigurationCustomTypesPerDataset = {
      data: data,
      options: this.options
    };

    return json;
  }

  public displayChart(item: ChartItem, config: ChartConfigurationCustomTypesPerDataset): Chart {
    
    return new Chart(
      item,
      config
    );
  }

  public removeDatasets(chart: Chart): void {
    // Remove labels
    chart.data.labels = [];
    // Remove data
    chart.data.datasets = [];
    // update chart
    chart.update();
  }
}
