import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  index: any = 0;
  data: any;
  property: any;
  headers: any;
  form: any;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "type": new FormControl(),
      "xAxis": new FormControl(),
      "yAxis": new FormControl(),
      "height": new FormControl('',Validators.min(300)),
      "width": new FormControl('',Validators.min(1000))
    })

    this.form.valueChanges.subscribe((value: any) => {
      if (value?.type === "Line" && this.form.dirty && this.form.valid) {
        let axisRange: any = this.prepareChart(value, this.data)
        value = { ...value, ...axisRange }
        this.createChart("lineChart_" + this.index, value, this.data)
      }
    })
  }

  downloadSVG() {
    const id = "#lineChart_" + this.index;
    const svgElement: any = document.querySelector(id);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'line_chart.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  }

  prepareChart(property: any, data: any) {
    let axisRange: any = {
      "minXAxis": Infinity,
      "maxXAxis": 0,
      "minYAxis": Infinity,
      "maxYAxis": 0
    };

    for (let i = 0; i < data.length; i++) {
      if (axisRange.minXAxis > data[i][property.xAxis]) {
        axisRange.minXAxis = +data[i][property.xAxis];
      }

      if (axisRange.maxXAxis < data[i][property.xAxis]) {
        axisRange.maxXAxis = +data[i][property.xAxis];
      }

      if (axisRange.minYAxis > data[i][property.yAxis]) {
        axisRange.minYAxis = +data[i][property.yAxis];
      }

      if (axisRange.maxYAxis < data[i][property.yAxis]) {
        axisRange.maxYAxis = +data[i][property.yAxis];
      }
    }

    axisRange["minXAxis"] -= 10;
    if (axisRange["minXAxis"] < 0) axisRange["minXAxis"] = 0;

    axisRange["minYAxis"] -= 10;
    if (axisRange["minYAxis"] < 0) axisRange["minYAxis"] = 0;
    axisRange["maxYAxis"] += 10;
    axisRange["maxXAxis"] += 10;

    // console.log("Axis Range ", axisRange)
    return axisRange
  }

  init() {
    let property = { ...this.property };

    this.form.patchValue(property);
    if (property && this.data) {
      let axisRange: any = this.prepareChart(property, this.data)
      property = { ...property, ...axisRange }
      this.createChart("lineChart_" + this.index, property, this.data);
    }
  }

  createChart(containerId: string, property: any, data: any) {
    // console.log("Chart Data ", property);
    data = [...data];
    // console.log("Data received to draw a chart ", data);

    var container = d3.select("#" + containerId);
    // Remove existing SVG if any
    container.select("svg").remove();

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = property.width - margin.left - margin.right,
      height = property.height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#" + containerId)
      .append("svg")
      .attr("width", property.width + margin.left + margin.right)
      .attr("height", property.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);


    const x = d3.scaleLinear().domain([property.minXAxis, property.maxXAxis]).range([0, width]);
    const y = d3.scaleLinear().domain([property.minYAxis, property.maxYAxis]).range([height, 0]);


    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d: any): any { return x(d[property.xAxis]) })
        .y(function (d: any): any { return y(d[property.yAxis]) }))


    // Add Text

    // Title
    // svg.append('text')
    //   .attr('x', width / 2 + 100)
    //   .attr('y', 100)
    //   .attr('text-anchor', 'middle')
    //   .style('font-family', 'Helvetica')
    //   .style('font-size', 20)
    //   .text('Line Chart');

    // X label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text(property.yAxis);

    // Y label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(-40,' + height / 2 + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text(property.xAxis);

  }

}
