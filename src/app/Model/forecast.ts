export interface Forecast {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export interface DailyForecast {
  Date: Date;
  EpochDate: number;
  Temperature: Temperature;
  Day: Day;
  Night: Day;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

export interface Temperature {
  Minimum: Imum;
  Maximum: Imum;
}

export interface Imum {
  Value: number;
  Unit: Unit;
  UnitType: number;
}

export enum Unit {
  F = 'F',
  C = 'C',
}

export interface Headline {
  EffectiveDate: Date;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: Date;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}
