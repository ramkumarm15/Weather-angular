import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getGeoLocationData(lat: number, long: number): Observable<any> {
    return this.http.get(
      `${environment.GeoPositionAPI}${environment.API_KEY}&q=${lat},${long}`
    );
  }

  getForecastData(key: string): Observable<any> {
    return this.http.get(
      `${environment.ForecastAPI}/${key}?apikey=${environment.API_KEY}`
    );
  }

  getWeatherByCityName(city: string): Observable<any> {
    return this.http.get(
      `${environment.CitySearchAPI}${environment.API_KEY}&q=${city}`
    );
  }

  getWeatherReport(cityname: string, days: number): Observable<any> {
    return this.http.get(
      `${environment.WeatherApi}${cityname}&days=${days}&aqi=yes`
    );
  }

  getWeatherByGeoPosition(
    lat: number,
    long: number,
    days: number
  ): Observable<any> {
    return this.http.get(
      `${environment.WeatherApi}${lat},${long}&days=${days}&aqi=yes`
    );
  }
}
