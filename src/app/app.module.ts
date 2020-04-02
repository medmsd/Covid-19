import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { StatsComponent } from './components/stats/stats.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    NgxEchartsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
