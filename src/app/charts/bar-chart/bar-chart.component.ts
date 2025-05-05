import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  index: any;
  data: any;
  property: any;
  headers: any;
  form: any;

  order: string = "random";

  ngOnInit(): void {
    this.form = new FormGroup({
      "type": new FormControl(),
      "xAxis": new FormControl(),
      "yAxis": new FormControl(),
      "height": new FormControl(500, Validators.min(300)),
      "width": new FormControl(1500, Validators.min(1000))
    });

    this.form.valueChanges.subscribe((value: any) => {
      if (value?.type === "Bar" && this.form.dirty && this.form.valid) {
        const data = this.prepareData(this.data, value);
        if (data) {
          this.createChart("barChart_" + this.index, value, data)
        }
      }
    })
  }

  sortData() {
    let property = this.form.getRawValue();

    let data = this.prepareData(this.data, property);

    if (this.order === "random" || this.order === "decrement") {
      this.order = "increment";
      data.sort((a: any, b: any) => {
        return +a[property.yAxis] - +b[property.yAxis]
      });
    } else {
      this.order = "decrement";
      data.sort((a: any, b: any) => {
        return +b[property.yAxis] - +a[property.yAxis]
      });
    }
    this.createChart("barChart_" + this.index, property, data)
  }

  downloadSVG() {
    const id = "#barChart_" + this.index;
    const svgElement: any = document.querySelector(id);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'bar_chart.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  }

  prepareData(data: any, property: any) {
    let newData: any = {}
    data.forEach((each: any) => {
      if (each[property['xAxis']] && each[property['xAxis']] != undefined) {
        if (!newData[each[property['xAxis']]]) newData[each[property['xAxis']]] = 0;
        newData[each[property['xAxis']]] += (+each[property['yAxis']])
      }
    })

    let finalData: any = [], max = 0;

    Object.keys(newData).forEach((each: any) => {
      if (newData[each] && newData[each] !== undefined) {
        let obj: any = {}
        obj[property['xAxis']] = each;
        obj[property['yAxis']] = newData[each];
        if (newData[each] > max) {
          max = newData[each];
        }
        finalData.push(obj)
      }
    })
    property['yScale'] = max + 10;
    return finalData
  }

  init() {
    let property = { ...this.property };

    this.form.patchValue(property);
    if (property && this.data) {
      const data = this.prepareData(this.data, property);
      if (data) {
        this.createChart("barChart_" + this.index, property, data);
      }
    }
  }

  createChart(containerId: string, property: BarInterface, data: any): void {
    data = [...data];
    // console.log("Data received to draw a chart ", data);

    var container = d3.select("#" + containerId);
    // Remove existing SVG if any
    container.select("svg").remove();

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = property.width - margin.left - margin.right,
      height = property.height - margin.top - margin.bottom;

    // let vb = "0 0 " + property.width + " " + property.height;

    // append the svg object to the body of the page
    var svg = d3.select("#" + containerId)
      .append("svg")
      .attr("width", property.width + margin.left + margin.right + 100)
      .attr("height", property.height + margin.top + margin.bottom)
      // .attr("viewBox", vb)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d: any) => d[property.xAxis]))
      .padding(0.2);

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, property.yScale])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
    // .attr("transform", "translate(0,0)rotate(0)");

    // Bars
    svg.selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("class", "label")
      .attr("x", (d: any): any => x(d[property.xAxis]))
      .attr("y", (d: any) => y(+d[property.yAxis]))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => height - y(+d[property.yAxis]))
      .attr("fill", "#69b3a2")
      .text((d: any) => +d[property.yAxis]);

    // add labels
    svg.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (function (d: any): any { return x(d[property.xAxis]); }))
      .attr("y", function (d: any) { return y(+d[property.yAxis]) - 20; })
      .attr("dy", ".75em")
      .text(function (d: any) { return d[property.yAxis]; });


    // X label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(0,70)rotate(0)')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text(property.xAxis);

    // Y label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(-40,' + height / 2 + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text(property.yAxis);
  }
}


interface BarInterface {
  "type": string,
  "xAxis": string,
  "yAxis": string,
  "height": number,
  "width": number,
  "yScale": number
}