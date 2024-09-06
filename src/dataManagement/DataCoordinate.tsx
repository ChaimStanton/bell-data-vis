import { type LatLngLiteral } from "leaflet";

/** A class that has each data point I.E. each dot on the map */
export class DataCoordinate implements LatLngLiteral {
  static debugRefCounter = 0;
  readonly debugRef: number;
  readonly lat: number;
  readonly lng: number;
  constructor(x: number, y: number) {
    this.lat = x;
    this.lng = y;
    this.debugRef = DataCoordinate.debugRefCounter++;
  }

  toString(): string {
    return (
      "( x Coordinate" +
      this.lat +
      ", Y coordinate" +
      this.lng +
      " Debug ref " +
      this.debugRef +
      ")"
    );
  }
}
