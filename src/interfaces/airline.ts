import { properties } from '../enum/airline.enum';

export interface flight {
  [properties.DATE_UTC]: string;
  [properties.HOUR_UTC]: string;
  [properties.TYPE]: string;
  [properties.AIRPORT]: string;
  [properties.ORIGIN_DESTINATION]: string;
  [properties.AIRLINE]: string;
  [properties.AIRSHIP]: string;
  [properties.PASSENGERS]: number;
}
