import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableViewComponent } from './table-view/table-view.component';
import { HeaderComponent } from './header/header.component';
import { NavTabComponent } from './nav-tab/nav-tab.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ChartComponent } from './charts/chart/chart.component';
import { ModalComponent } from './modal/modal.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { HomeComponent } from './home/home.component';
import { ViewCardsComponent } from './home/view-cards/view-cards.component';
import { ContactComponent } from './home/contact/contact.component';
import { MapComponent } from './charts/map/map.component';
import { TimelineComponent } from './home/timeline/timeline.component';
import { chartsReducer } from './ngrx/data.reducer';
import { MultibarChartComponent } from './charts/multibar-chart/multibar-chart.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';



@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    HeaderComponent,
    NavTabComponent,
    PieChartComponent,
    BarChartComponent,
    ChartComponent,
    ModalComponent,
    LineChartComponent,
    HomeComponent,
    ViewCardsComponent,
    ContactComponent,
    MapComponent,
    TimelineComponent,
    MultibarChartComponent,
    UserSelectionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbNavModule,
    NgbTooltip,
    NgbPagination,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({chartData : chartsReducer}  ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
