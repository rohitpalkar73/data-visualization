import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'app-multibar-chart',
  templateUrl: './multibar-chart.component.html',
  styleUrls: ['./multibar-chart.component.css']
})
export class MultibarChartComponent implements OnInit {
  index: any = 0;
  data: any;
  property: any = {};
  headers: any;
  form: any;

  ngOnInit(): void {
    this.form = new FormGroup({
      "type": new FormControl(),
      "xAxis": new FormControl(),
      "yAxis": new FormControl(),
      "groupBy": new FormControl(),
      "height": new FormControl("500", Validators.min(300)),
      "width": new FormControl("1500", Validators.min(1000))
    });

    this.form.valueChanges.subscribe((value: any) => {
      if (value?.type === "MultiBar" && this.form.dirty && this.form.valid) {
        let data = this.prepareData(this.data, value);
        if (data) {
          this.createChart("multiBarChart_" + this.index, value, data)
        }
      }
    })
  }

  downloadSVG() {
    const id = "#multiBarChart_" + this.index;
    const svgElement: any = document.querySelector(id);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'MultiBarChart.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  }


  init() {
    let property = { ...this.property };

    this.form.patchValue(property);
    if (property && this.data) {
      let data: any[] = this.prepareData(this.data, property);
      if (data != null && data.length > 0 && property !== undefined) {
        this.createChart("multiBarChart_" + this.index, property, data);
      }
    }
  }

  prepareData(data: any, property: MultiBarInterface) {
    let newData: any = {}
    data.forEach((each: any) => {
      if (each[property['xAxis']] && each[property['xAxis']] != undefined) {
        const key = each[property['xAxis']] + "_" + each[property['groupBy']];
        if (!newData[key]) newData[key] = 0;
        newData[key] += (+each[property['yAxis']])
      }
    })

    let finalData: any = [], max = 0;

    Object.keys(newData).forEach((each: any) => {
      if (newData[each] && newData[each] !== undefined) {
        let obj: any = {}
        obj[property['xAxis']] = each.split("_")[0];
        obj[property['yAxis']] = newData[each];
        obj[property['groupBy']] = each.split("_")[1];
        if (newData[each] > max) {
          max = newData[each];
        }
        finalData.push(obj)
      }
    })
    property['yScale'] = max + 10;

    return finalData
  }


  getRandomColors(count: any) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      // Generate a random color in hexadecimal format
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  }

  createChart(containerId: string, property: any, data: any) {

    var container = d3.select("#" + containerId);
    // Remove existing SVG if any
    container.select("svg").remove();

    // Specify the chart’s dimensions.
    const margin = {
      left: 40,
      right: 10,
      top: 10,
      bottom: 20
    }
    let width = property.width - margin.left - margin.right,
      height = property.height - margin.top - margin.bottom;

    var svg = d3.select("#" + containerId)
      .append("svg")
      .attr("width", property.width + margin.left + margin.right)
      .attr("height", property.height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Prepare the scales for positional and color encodings.
    // Fx encodes the state.
    const fx = d3.scaleBand()
      .rangeRound([margin.left, width - margin.right])
      .domain(new Set(data.map((d: any) => d[property['xAxis']])))
      .paddingInner(0.1);

    const uniqueX = data.reduce((acc: any, d: any) => {
      if (!acc.includes(d[property['groupBy']])) {
        acc.push(d[property['groupBy']])
      }
      return acc
    }, []);

    const x = d3.scaleBand()
      .rangeRound([0, fx.bandwidth()])
      .domain(uniqueX)
      .padding(0.05);

    const colorScheme = this.getRandomColors(uniqueX.length)

    const color = d3.scaleOrdinal()
      .domain(uniqueX!)
      .range(colorScheme)
      .unknown("#ccc");

    // Y encodes the height of the bar.
    let maxValue = 0;
    data.forEach((each: any) => {
      if (+each[property['yAxis']] > maxValue) {
        maxValue = +each[property['yAxis']];
      }
    });

    const y = d3.scaleLinear()
      .domain([0, maxValue])
      .rangeRound([height - margin.bottom, margin.top]);

    // Append a group for each state, and a rect for each age.
    svg.append("g")
      .selectAll()
      .data(d3.group(data, (d: any) => d[property['xAxis']]))
      .join("g")
      .attr("transform", ([state]) => `translate(${fx(state)},0)`)
      .selectAll()
      .data(([, d]) => d)
      .join("rect")
      .attr("x", (d: any): any => x(d[property['groupBy']]))
      .attr("y", (d: any) => y(+d[property['yAxis']]))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => y(0) - y(+d[property['yAxis']]))
      .attr("fill", (d: any): any => color(d[property['groupBy']]));

    // Append the horizontal axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(fx))

    // Append the vertical axis.
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))


    svg.append("g")
      .selectAll("g")
      .data(d3.group(data, (d: any) => d[property['xAxis']]))
      .join("g")
      .attr("transform", ([state]) => `translate(${fx(state)},0)`)
      .selectAll("text")
      .data(([, d]) => d)
      .join("text")
      .attr("x", (d: any): any => x(d[property['groupBy']])! + x.bandwidth() / 2)
      .attr("y", (d: any) => y(+d[property['yAxis']]) - 10)
      .attr("dy", ".35em")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .text((d: any) => d[property['yAxis']]);


    // X label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text(property.xAxis);

    // Y label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(-20,' + height / 2 + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text(property.yAxis);


    // Add a legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width + 20}, 0)`); // Position the legend

    uniqueX.forEach((category:string, index:any) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(-500, ${index * 20})`);

      legendRow
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", colorScheme[index]);

      legendRow
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("font-family", "Helvetica")
        .style("font-size", 12)
        .text(category);
    });
  }

}

interface MultiBarInterface {
  "type": string,
  "xAxis": string,
  "yAxis": string,
  "groupBy": string,
  "height": number,
  "width": number,
  "yScale": number
}