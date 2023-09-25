import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  myBudget: any = null;

  getData(): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/budget')
  }

  setBudget(newData: any): void {
    this.myBudget = newData;
  }

  // Function to get the data
  getBudget(): any {
    return this.myBudget;
  }
}
