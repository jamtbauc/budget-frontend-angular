import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IBudgetData } from '../interfaces/IBudgetData';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const budgetData: IBudgetData[] = [
      {
        date: "2023-02-16",
        bill: "McDonalds",
        amount: 12.37,
        remaining: 830.88
      },
      {
        date: "2023-02-16",
        bill: "Circle K",
        amount: 25.00,
        remaining: 818.51
      },
      {
        date: "2023-02-16",
        bill: "Circle K",
        amount: 6.14,
        remaining: 793.51
      },
      {
        date: "2023-02-18",
        bill: "Huey's",
        amount: 42.60,
        remaining: 787.37
      },
      {
        date: "2023-02-19",
        bill: "Taco Bell",
        amount: 7.45,
        remaining: 779.92
      },
      {
        date: "2023-02-20",
        bill: "Doordash",
        amount: 35.82,
        remaining: 744.10
      },
      {
        date: "2023-02-21",
        bill: "1st Franklin Financial",
        amount: 124.86,
        remaining: 619.24
      },
      {
        date: "2023-02-22",
        bill: "World Finance",
        amount: 125,
        remaining: 494.24
      },
      {
        date: "2023-02-23",
        bill: "Discover",
        amount: 35,
        remaining: 459.24 
      },
      {
        date: "2023-02-24",
        bill: "Upgrade",
        amount: 117.98,
        remaining: 341.26
      },
      {
        date: "2023-02-25",
        bill: "Quicklane Card",
        amount: 78.00,
        remaining: 263.26
      },
      {
        date: "2023-02-26",
        bill: "1st Franklin Financial",
        amount: 124.86,
        remaining: 138.40
      },
      {
        date: "2023-02-27",
        bill: "World Finance",
        amount: 125.00,
        remaining: 13.40
      }
    ];

    return {budgetData};
  }
}
