import { Component, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { MapComponent } from 'src/app/charts/map/map.component';
import { MultibarChartComponent } from '../multibar-chart/multibar-chart.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  host: { 'class': 'mb-5 position-relative' }
})
export class ChartComponent implements OnInit {
  @ViewChild("chartPlace", { static: true, read: ViewContainerRef }) chartPlace: any;
  @Input() data: any
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.addCharts(this.data);
  }

  addCharts(data: any) {
    if (data['charts']) {
      this.chartPlace.clear();
      for (let i = 0; i < data['charts'].length; i++) {
        const component: Type<any> | null = this.getChart(data['charts'][i]['type']);
        if (component) {
          const view = this.viewContainerRef.createComponent(component);

          // set data
          view.instance["data"] = data.data;
          view.instance["property"] = data['charts'][i]
          view.instance["index"] = data.id + "_" + i;
          view.instance["headers"] = data.headers


          setTimeout(() => { view.instance.init() }, 0);
          this.chartPlace.insert(view.hostView)
        }
      }

    }
  }

  getChart(componentName: string) {
    switch (componentName) {
      case "Bar": return BarChartComponent
      case "Pie": return PieChartComponent
      case "Line": return LineChartComponent
      case "Map": return MapComponent
      case "MultiBar": return MultibarChartComponent
      default: return null;
    }

  }

}
