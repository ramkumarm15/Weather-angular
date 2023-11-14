import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, merge, Observable, of, Subscription } from 'rxjs';
import { Forecast } from 'src/app/Model/forecast';
import {
  Astro,
  CityDetail,
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
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loadData: boolean = true;
  astro = {} as Astro;
  currentData = {} as Current;
  forecastData = {} as Forecast;
  location = {} as Location;
  cityName: string = '';
  cityDetails: CityDetail[] = [];
  cityDetail: CityDetail = {} as CityDetail;

  constructor(private service: WeatherService) {
  }

  ngOnInit(): void {
    this.loadData = true;
    this.subscriptions.push(
      this.service.currentCitySubject.subscribe({
        next: (response: CityDetail) => {
          console.log(response);
          this.cityDetail = response;
          this.getWeatherByOpenApi(response.lat, response.lon);
        },
      })
    );
    this.subscriptions.push(
      this.service.savedCitiesSubject.subscribe({
        next: (response: CityDetail[]) => {
          this.cityDetails = response;
        },
      })
    );
    this.subscriptions.push(
      this.service.weatherSubject.subscribe({
        next: (response: WeatherReport) => {
          this.currentData = response.current;
          this.location = response.location;
          this.astro = response.forecast.forecastday[0].astro;
        },
      })
    );
  }

  searchCity(): void {
    if(this.cityName !== ''){
      this.getWeatherDataByCityName(this.cityName);
    }
  }

  /**
   * Get geolocation using navigator
   */
  getLocation() {
    this.loadData = true;
    if (!navigator.onLine) {
      window.alert('Connect to internet');
      this.loadData = false;
    }

    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          this.getWeatherByOpenApi(latitude, longitude);
          // this.getGeoLocationData(latitude, longitude);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      window.alert('Please clear cache and try again!');
    }
  }

  /**
   * get weather details using lat and long
   * @param latitude
   * @param longitude
   */
  getWeatherByOpenApi(latitude: number, longitude: number) {
    this.loadData = true;
    this.service.getWeatherByGeoPosition(latitude, longitude, 3).subscribe({
      next: (response: WeatherReport) => {
        if (this.service.checkCitySaved(response.location.name) > -1) {
          response.location.added = true;
        } else {
          response.location.added = false;
        }
        let city: CityDetail = {
          added: response.location.added,
          name: response.location.name,
          lat: response.location.lat,
          lon: response.location.lon,
        };
        console.log(city)
        this.service.weatherSubject.next(response);
        this.cityDetail = city;
        this.loadData = false;
      },
    });
  }

  /**
   *
   * @param latitude
   * @param longitude
   */
  getGeoLocationData(latitude: number, longitude: number) {
    this.loadData = true;
    this.service.getGeoLocationData(latitude, longitude).subscribe({
      next: (response: Weather) => {
        // this.getForecastData(response.Key);
        this.loadData = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * get 5-day forecast details of geolocation
   * @param key
   */
  // getForecastData(key: string) {
  //   this.service.getForecastData(key).subscribe({
  //     next: (response: Forecast) => {
  //       console.log(response);
  //       this.forecastData = response;
  //       this.loadData = false;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  /**
   * @description search and get weather details by city name
   * @param city
   */
  getWeatherDataByCityName(city: string) {
    this.loadData = true;
    if (city != '') {
      // this.service.getWeatherByCityName(city).subscribe({
      //   next: (response: Weather[]) => {
      //     this.cityName = '';
      //     // this.getForecastData(response[0].Key);
      //   },
      // });

      this.service.getWeatherReport(city, 5).subscribe({
        next: (response: WeatherReport) => {
          this.cityName = '';
          this.cityDetail = {
            added: response.location.added,
            name: response.location.name,
            lat: response.location.lat,
            lon: response.location.lon,
          };
          this.service.weatherSubject.next(response);
          this.service.currentCitySubject.next(this.cityDetail);
          this.loadData = false;
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.error.error.message);
          this.cityName = ''
          this.loadData = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
