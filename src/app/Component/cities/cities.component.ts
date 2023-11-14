import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CityDetail } from 'src/app/Model/weather';
import { WeatherService } from 'src/app/Service/weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  @Input() cityDetails: CityDetail[] = [];
   cityDetailss: CityDetail[] = [];
  loadData: boolean = true;
  constructor(private service: WeatherService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.savedCitiesSubject.subscribe({
        next: (response: CityDetail[]) => {
          console.log(response);
          this.cityDetailss = response;
          setTimeout(()=>{
            this.loadData = false
          },2000)
        },
      })
    );
  }

  ngAfterViewInit(): void {
    this.service.getSavedCities();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  loadCityData(city: CityDetail): void {
    this.service.currentCitySubject.next(city);
  }
}
