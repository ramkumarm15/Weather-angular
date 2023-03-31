import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/Model/forecast';
import { Astro, Current, Location, Weather } from 'src/app/Model/weather';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css'],
})
export class WeatherReportComponent implements OnInit {
  constructor() {}

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

  tempUnitType = 'F';

  changeTempUnitType(unit: string): void {
    this.tempUnitType = unit;
    console.log(this.tempUnitType)
  }

  convertToCelcius(value: number) {
    return ((value - 32) * 5) / 9;
  }

  ngOnInit(): void {
    console.log(this.report);
  }

  @Input() report!: Current;
  @Input() forecast!: Forecast;
  @Input() location!: Location;
  @Input() astro!: Astro;

  getDayFromDate(date: string) {
    let formattedDate = new Date(
      Number(date.slice(0, 4)),
      Number(date.slice(5, 7)) - 1,
      Number(date.slice(8, 10))
    );
    return this.Day[formattedDate.getDay()].short;
  }
}
