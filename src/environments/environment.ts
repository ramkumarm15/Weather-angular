// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: 'dMps9XHKmv5DbdkizAjnt1BP9akA1IpJ',
  GeoPositionAPI:
    'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=',
  ForecastAPI: 'http://dataservice.accuweather.com/forecasts/v1/daily/5day',
  CitySearchAPI:
    'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=',
  WeatherApi:
    'http://api.weatherapi.com/v1/forecast.json?key=cc1f71266946419a8ce52142201410&q=',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
