import { Component, OnInit } from '@angular/core';
import { Forecast } from 'src/app/Model/forecast';
import {
  Astro,
  Current,
  Forecasts,
  Location,
  Weather,
  WeatherReport,
} from 'src/app/Model/weather';
import { WeatherService } from 'src/app/Service/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: WeatherService) {}

  ngOnInit(): void {
    this.getLocation();
  }

  loadData: boolean = true;

  astro!: Astro;
  currentData!: Current;
  forecastData!: Forecast;
  location!: Location;
  cityName: string = '';

  onClick(): void {
    this.getWeatherDataByCityName(this.cityName);
  }

  getWeatherDataByCityName(city: string) {
    this.loadData = true;
    if (city != '') {
      this.service.getWeatherByCityName(city).subscribe({
        next: (response: Weather[]) => {
          this.cityName = '';
          this.getForecastData(response[0].Key);
        },
      });

      this.service.getWeatherReport(city, 5).subscribe({
        next: (response: WeatherReport) => {
          this.currentData = response.current;
          this.location = response.location;
          this.astro = response.forecast.forecastday[0].astro;
        },
      });
    }
  }

  getLocation() {
    if (!navigator.onLine) {
      window.alert('Connect to internet');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          this.getWeatherByOpenApi(latitude, longitude);
          this.getGeoLocationData(latitude, longitude);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      window.alert('Please clear cache and try again!');
    }
  }

  getWeatherByOpenApi(latitude: number, longitude: number) {
    this.service.getWeatherByGeoPosition(latitude, longitude, 3).subscribe({
      next: (response: WeatherReport) => {
        console.log(response);
        this.currentData = response.current;
        this.location = response.location;
        this.astro = response.forecast.forecastday[0].astro;
      },
    });
  }

  getGeoLocationData(latitude: number, longitude: number) {
    this.service.getGeoLocationData(latitude, longitude).subscribe({
      next: (response: Weather) => {
        this.getForecastData(response.Key);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getForecastData(key: string) {
    this.service.getForecastData(key).subscribe({
      next: (response: Forecast) => {
        console.log(response);
        this.forecastData = response;
        this.loadData = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
