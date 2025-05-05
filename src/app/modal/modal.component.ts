import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { addChart } from '../ngrx/data.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  modalInstance: any;
  form: any;
  type: any = [{ key: "bar", value: "Bar" }, { key: "pie", value: "Pie" }, { key: "line", value: "Line" }, { key: "map", value: "Map" }, { key: "multiBar", value: "MultiBar" }];

  constructor(private modalService: NgbModal, private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "type": new FormControl(),
      "height": new FormControl("1500"),
      "width": new FormControl("500"),
      "xAxis": new FormControl(),
      "yAxis": new FormControl(),
      "groupBy": new FormControl(),
      "yScale": new FormControl(),
      "radius": new FormControl(),
      "fontsize": new FormControl(),
      "latitude": new FormControl(),
      "longitude": new FormControl(),
      "label": new FormControl(),
    });
  }

  createChart() {
    const property = { ...this.form.value };
    let newObj: any = {}
    Object.keys(property).forEach((key: any) => {
      if (property[key] != null) {
        newObj[key] = property[key];
      }
    });

    this.store.dispatch(addChart({ id: this.data.id, property: newObj }));
    this.closeModal();
  }

  openModal(content: any) {
    this.form.reset();
    this.modalInstance = this.modalService.open(content, { backdrop: true, centered: true });
  }

  closeModal() {
    this.modalInstance.close();
  }
}
