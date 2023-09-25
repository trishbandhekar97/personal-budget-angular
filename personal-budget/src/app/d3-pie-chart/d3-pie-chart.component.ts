import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'pb-d3-pie-chart',
  templateUrl: './d3-pie-chart.component.html',
  styleUrls: ['./d3-pie-chart.component.scss']
})
export class D3PieChartComponent implements OnInit, AfterViewInit{

  constructor(private budgetService: DataServiceService) {}


  ngAfterViewInit(): void {
    this.budgetService.getData().subscribe((data) => {
      this.budgetService.setBudget(data);
       this.data = this.budgetService.getBudget().myBudget;

      this.createSvg();
      this.drawChart();
    });
  }

  


  ngOnInit(): void {
    
  }


  private data = [];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];


  private createSvg(): void {
    this.svg = d3
      .select('#pie-chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => {
      console.log(d);
      return Number(d.budget);
    });

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d: any, i: any) => (this.colors[i]))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text((d: any) => {
        console.log(d.data.title);
        return d.data.title;
      })
      .attr(
        'transform',
        (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
      )
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }

}
