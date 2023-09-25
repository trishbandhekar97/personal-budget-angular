import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit{

  public dataSource = {
    datasets:  [
        {
            data: [] as any[],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#795548',
                '#2196d4',
                '#f19336',
            ],
        }
    ],
    labels: [] as string[]
  };





  constructor(private http: HttpClient, private budgetService: DataServiceService) {}


  ngAfterViewInit(): void {

  }

 

  

  ngOnInit(): void {  
      this.budgetService.getData().subscribe((res:any) => {
        console.log(res.myBudget)
        for(let i=0;i<res.myBudget.length;i++)
        {
            this.dataSource.datasets[0].data[i]=res.myBudget[i].budget;
            this.dataSource.labels[i]=res.myBudget[i].title;  
        } 
        this.createChart();
      })
  
  }

  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    })
  }
}


