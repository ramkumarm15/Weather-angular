import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Forecast } from 'src/app/Model/forecast';
import {
  Astro,
  CityDetail,
  Current,
  Location,
  Weather,
} from 'src/app/Model/weather';
import { WeatherService } from 'src/app/Service/weather.service';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css'],
})
export class WeatherReportComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() report!: Current;
  @Input() forecast!: Forecast;
  @Input() location!: Location;
  @Input() astro!: Astro;

  @Input() cityDetail!: CityDetail;

  city: CityDetail = {} as CityDetail;

  subs: Subscription[] = [];

  tempUnitType = 'F';

  Day = [
    { day: 'Sunday', short: 'Sun' },
    { day: 'Monday', short: 'Mon' },
    { day: 'Tuesday', short: 'Tue' },
    { day: 'Wednesday', short: 'Wed' },
    { day: 'Thursday', short: 'Thurs' },
    { day: 'Friday', short: 'Fri' },
    { day: 'Saturday', short: 'Sat' },
  ];

  uvIndex = {
    1: 'Good',
    2: 'Moderate',
    3: 'Unhealthy for sensitive group',
    4: 'Unhealthy',
    5: 'Very Unhealthy',
    6: 'Hazardous',
  };

  constructor(private service: WeatherService) {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.cityDetail)
  }
  ngAfterViewInit(): void {
    // console.log(this.cityDetail)
  }

  ngOnInit(): void {
    // console.log(this.cityDetail);
  }

  getDayFromDate(date: string) {
    let formattedDate = new Date(
      Number(date.slice(0, 4)),
      Number(date.slice(5, 7)) - 1,
      Number(date.slice(8, 10))
    );
    return this.Day[formattedDate.getDay()].short;
  }

  cityAdded: boolean = true;

  cityDetailHasData(): boolean {
    return Object.keys(this.cityDetail).length > 0;
  }

  addCity(): void {
    this.cityDetail.added = true;

    this.service.saveCity(this.cityDetail);
  }

  removeCity(): void {
    this.cityDetail.added = false;
    // console.log(this.cityDetail);
    this.service.reomveCity(this.cityDetail);
  }

  changeTempUnitType(unit: string): void {
    this.tempUnitType = unit;
    console.log(this.tempUnitType);
  }

  convertToCelcius(value: number) {
    return ((value - 32) * 5) / 9;
  }
}
