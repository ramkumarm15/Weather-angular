import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityDetail, WeatherReport } from '../Model/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public weatherData!: WeatherReport;
  public weatherSubject: Subject<WeatherReport> = new Subject<WeatherReport>();

  public savedCities!: CityDetail[];
  public savedCitiesSubject: Subject<CityDetail[]> = new Subject<
    CityDetail[]
  >();
  public currentCitySubject: BehaviorSubject<CityDetail> =
    new BehaviorSubject<CityDetail>({} as CityDetail);

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
    console.log(lat, long)
    return this.http.get(
      `${environment.WeatherApi}${lat},${long}&days=${days}&aqi=yes`
    );
  }

  getSavedCities(): void {
    let dataFromLocalStorage: any = localStorage.getItem('cities');
    const cities: any[] = JSON.parse(dataFromLocalStorage);
    this.savedCities = cities ? cities : [];
    this.dispatchCities();
  }

  checkCitySaved(city: string): number {
    let index = -1;
    // console.log(this.savedCities);
    this.savedCities.forEach((x, i) => {
      if (x.name === city) {
        index = i;
      }
    });
    return index;
  }

  saveCity(city: CityDetail): void {
    if (this.checkCitySaved(city.name) === -1) {
      this.savedCities.unshift(city);
      this.dispatchCities();
      this.setCities();
    }
  }

  reomveCity(city: CityDetail): void {
    let index = this.checkCitySaved(city.name);
    console.log(index);
    if (index > -1) {
      this.savedCities.splice(index, 1);
      this.dispatchCities();
      this.setCities();
    }
  }

  setCities(): void {
    localStorage.setItem('cities', JSON.stringify(this.savedCities));
  }

  dispatchCities(): void {
    this.savedCitiesSubject.next(this.savedCities);
  }
}
