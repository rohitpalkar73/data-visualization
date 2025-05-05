import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addData } from '../ngrx/data.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visualizeMode: string = "home";

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value instanceof NavigationStart) {
        if (value.url === "/visualize") {
          this.visualizeMode = "visualize";
        } else if (value.url === "/userselection") {
          this.visualizeMode = "userselection"
        } else {
          this.visualizeMode = "home";
        }
      }
    })
  }

  loginUser() {

  }

  scrollToLast() {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }

  saveData(data: any) {
    this.store.dispatch(addData({ csvData: data }))
  }

  parseCSV(csvContent: any, name: string) {
    csvContent = csvContent.replace("\r", "");
    let lines = csvContent.split('\n');
    let headers = lines[0].split(',');
    // console.log('headers ', headers)
    let header_: any = [];
    var rows: any = [];

    lines.slice(1).forEach((line: any) => {
      if (line.length > 0) {
        let values = line.split(',');
        let row: any = {};
        headers.forEach((header: any, index: any) => {
          row[header] = values[index];
        });
        rows.push(row);
      }
    })

    headers.forEach((header: any) => {
      header_.push(
        {
          "key": header,
          "value": header
        }
      )
    });

    return { id: Math.floor(Math.random() * 10000000000).toString(), charts: [], data: rows, headers: header_, name: name }
  }

  onAddData($event: any) {
    const file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        const csvContent = e?.target?.result as string;
        const data: any = this.parseCSV(csvContent, file.name.split(".")[0]);
        console.log(data);
        this.saveData(data)

        $event.target.value = ""
      }
      reader.onerror = function (e: any) {
        console.log("Error in reading file ", e);
      }
      reader.readAsText(file);
    } else {
      console.log("Uable to read file..")
    }
  }

}
