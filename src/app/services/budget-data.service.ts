import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBudgetData } from '../interfaces/IBudgetData';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  private budgetDataUrl: string = 'api/budgetData';

  constructor(
    private http: HttpClient
  ) { }

  public getBudgetData(): Observable<IBudgetData[]> {
    return this.http.get<IBudgetData[]>(this.budgetDataUrl).pipe(
      tap(_ => console.info(`Fetched budget data`))
    );
  }
}
