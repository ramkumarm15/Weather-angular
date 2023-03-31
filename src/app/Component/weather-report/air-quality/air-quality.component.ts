import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css'],
})
export class AirQualityComponent implements OnInit {
  @Input() airQuality!: any;

  constructor() {}

  ngOnInit(): void {}

  aqiData: any = [
    { name: 'NO', indexName: 'no2', subStr: '2' },
    { name: 'SO', indexName: 'so2', subStr: '2' },
    { name: 'PM', indexName: 'pm10', subStr: '10' },
    { name: 'PM', indexName: 'pm2_5', subStr: '2.5' },
    { name: 'O', indexName: 'o3', subStr: '3' },
    { name: 'CO', indexName: 'co', subStr: '' },
  ];

  getIndexLevel(gas: string, value: number): string {
    switch (gas) {
      case 'so2':
        return this.getSO2IndexLevel(value);
        break;
      case 'no2':
        return this.getNo2IndexLevel(value);
        break;
      case 'pm10':
        return this.getPM10IndexLevel(value);
        break;
      case 'pm2_5':
        return this.getPM2_5IndexLevel(value);
        break;
      case 'o3':
        return this.getO3IndexLevel(value);
        break;
      case 'co':
        return this.getCOIndexLevel(value);
        break;
      default:
        return '';
        break;
    }
  }

  getSO2IndexLevel(value: number): string {
    // let value: number = Number(apivalue);
    switch (true) {
      case value >= 0 && value <= 20:
        return 'Good';
        break;
      case value >= 20 && value <= 80:
        return 'Moderate';
        break;
      case value >= 80 && value <= 250:
        return 'UnHealthy';
        break;
      case value >= 250 && value <= 350:
        return 'Very Healthy';
        break;
      case value > 350:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }
  getNo2IndexLevel(value: number): string {
    switch (true) {
      case value >= 0 && value <= 40:
        return 'Good';
        break;
      case value >= 40 && value <= 70:
        return 'Moderate';
        break;
      case value >= 70 && value <= 150:
        return 'UnHealthy';
        break;
      case value >= 150 && value <= 200:
        return 'Very UnHealthy';
        break;
      case value > 200:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }
  getPM10IndexLevel(value: number): string {
    switch (true) {
      case value >= 0 && value <= 20:
        return 'Good';
        break;
      case value >= 20 && value <= 50:
        return 'Moderate';
        break;
      case value >= 50 && value <= 100:
        return 'UnHealthy';
        break;
      case value >= 100 && value <= 200:
        return 'Very UnHealthy';
        break;
      case value > 200:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }
  getPM2_5IndexLevel(value: number): string {
    switch (true) {
      case value >= 0 && value <= 10:
        return 'Good';
        break;
      case value >= 10 && value <= 25:
        return 'Moderate';
        break;
      case value >= 25 && value <= 50:
        return 'UnHealthy';
        break;
      case value >= 50 && value <= 75:
        return 'Very UnHealthy';
        break;
      case value > 75:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }
  getO3IndexLevel(value: number): string {
    switch (true) {
      case value >= 0 && value <= 60:
        return 'Good';
        break;
      case value >= 60 && value <= 100:
        return 'Moderate';
        break;
      case value >= 100 && value <= 140:
        return 'UnHealthy';
        break;
      case value >= 140 && value <= 180:
        return 'Very UnHealthy';
        break;
      case value > 180:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }
  getCOIndexLevel(value: number): string {
    switch (true) {
      case value >= 0 && value <= 4400:
        return 'Good';
        break;
      case value >= 4400 && value <= 9400:
        return 'Moderate';
        break;
      case value >= 9400 && value <= 12400:
        return 'UnHealthy';
        break;
      case value >= 12400 && value <= 15400:
        return 'Very UnHealthy';
        break;
      case value > 15400:
        return 'Hazardous';
        break;

      default:
        return '';
        break;
    }
  }

  getAQIClass(value: string) {
    return `${value}IndexLevel`;
  }
}
