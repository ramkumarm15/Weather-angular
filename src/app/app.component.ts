import { Component, OnInit } from '@angular/core';
import { CityDetail, WeatherReport } from './Model/weather';
import { WeatherService } from './Service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.service.getSavedCities();
    this.getLocation();
  }

  constructor(private service: WeatherService) {}

  /**
   * Get geolocation using navigator
   */
  getLocation() {
    if (!navigator.onLine) {
      window.alert('Connect to internet');
      // this.loadData = false;
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

  getWeatherByOpenApi(latitude: number, longitude: number) {
    this.service.getWeatherByGeoPosition(latitude, longitude, 3).subscribe({
      next: (response: WeatherReport) => {
        console.log(response);
        if (this.service.checkCitySaved(response.location.name) > -1) {
          response.location.added = true;
        } else {
          response.location.added = false;
        }
        let cityDetail: CityDetail = {
          added: response.location.added,
          name: response.location.name,
          lat: response.location.lat,
          lon: response.location.lon,
        };
        // console.log(cityDetail)
        this.service.weatherSubject.next(response);
        this.service.currentCitySubject.next(cityDetail);
      },
    });
  }
}
