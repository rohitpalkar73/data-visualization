import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  index: any
  data: any;
  property: any;
  headers: any;
  form: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      "type": new FormControl(),
      "xAxis": new FormControl(),
      "yAxis": new FormControl(),
      "height": new FormControl('', Validators.min(300)),
      "width": new FormControl('', Validators.min(300)),
      "radius": new FormControl(),
      "fontsize": new FormControl(),
    })

    this.form.valueChanges.subscribe((value: any) => {
      if (value?.type === "Pie" && this.form.dirty && this.form.valid) {
        let data: any = this.prepareData(this.data, value);
        if (data) {
          this.createChart("pieChart_" + this.index, value, data)
        }
      }
    });

  }

  init() {
    let property = { ...this.property };

    this.form.patchValue(property);
    if (property && this.data) {
      let data: any = this.prepareData(this.data, property);
      if (data) {
        this.createChart("pieChart_" + this.index, property, data);
      }
    }
  }

  prepareData(data: any, property: PieInterface) {
    let newData: any = {}
    data.forEach((each: any) => {
      if (each[property['xAxis']] && each[property['xAxis']] != undefined) {
        if (!newData[each[property['xAxis']]]) {
          newData[each[property['xAxis']]] = 0;
        }
        newData[each[property['xAxis']]] += (+each[property['yAxis']])
      }
    })
    return newData
  }

  downloadSVG() {
    const id = "#pieChart_" + this.index;
    const svgElement: any = document.querySelector(id);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'pie_chart.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  }

  createChart(chartId: any, property: PieInterface, data: any) {
    data = { ...data };
    // console.log("Data received to draw a chart ", data);
    var container = d3.select("#" + chartId);
    // Remove existing SVG if any
    container.select("svg").remove();

    // set the dimensions and margins of the graph
    const margin = 10;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = (Math.min(property.width, property.height) / 2 - margin) + 100;
    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#" + chartId)
      .append("svg")
      .attr("width", property.width)
      .attr("height", property.height)
      .append("g")
      .attr("transform", `translate(${property.width / 2}, ${property.height / 2})`);

    // Create dummy data
    // const data: any = { a: 9, b: 20, c: 30, d: 8, e: 12 }

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie: any = d3.pie()
      .value(function (d: any) { return d[1] })
    const data_ready = pie(Object.entries(data))

    // shape helper to build arcs:
    const arcGenerator: any = d3.arc()
      .innerRadius(0)
      .outerRadius(property.radius)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', function (d: any): any { return (color(d.data[0])) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg
      .selectAll('mySlices')
      .data(data_ready)
      .join('text')
      .text(function (d: any) { return d.data[0] + " : " + d.data[1] })
      .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
      .style("text-anchor", "middle")
      .style("font-size", property.fontsize)
  }

}


interface PieInterface {
  "type": string,
  "xAxis": string,
  "yAxis": string,
  "height": number,
  "width": number,
  "radius": number,
  "fontsize": number,
}