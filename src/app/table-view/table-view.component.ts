import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  @Input() data: any;

  dataChunks: any;

  page: number = 0;
  noOfPages: any = [];
  recordsPerPage: number = 5;
  startIndex: number = 0;

  ngOnInit(): void {
    if (this.data) {
      this.noOfPages = Math.ceil(this.data.data.length / this.recordsPerPage) * 10;
      this.addPagination(1);
    }
  }

  addPagination(page: number) {
    const startIndex = ((page - 1) * this.recordsPerPage);
    const endIndex = startIndex + this.recordsPerPage;
    this.startIndex = startIndex;
    this.dataChunks = this.data.data.slice(startIndex, endIndex)
  }

}
