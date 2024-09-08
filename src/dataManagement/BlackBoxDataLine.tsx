import { DataCoordinate } from "./DataCoordinate";

export class BlackBoxDataLine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- this is a csv parser so we don't know the keys
  [key: string]: any; // means that any key can be added to the object which is what we use for parsing the csv

  // @ts-expect-error-next-line as it is always defined in the next line
  coord: DataCoordinate;

  // readonly coord: DataCoordinate;
  constructor(dataRow: Record<string, string>) {
    try {
      // make a data coordinate object using the latitude and longitude from dataRow
      this.coord = new DataCoordinate(
        parseFloat(dataRow.Latitude),
        parseFloat(dataRow.Longitude),
      );
    } catch (err) {
      console.log(err);
      return; // we don't want to continue and create the object if there is an error
    }

    Object.entries(dataRow).forEach(([key, value]: [string, string]) => {
      switch (value) {
        case "":
          this[key] = null;
          break;
        case "Longitude":
        case "Latitude":
          break;
        default:
          this[key] = value;
          break;
      }
    });
    // console.log(this.toString());
  }

  toString(): string {
    let strToReturn = "";
    Object.entries(this).forEach(([key, value]: [string, string]) => {
      strToReturn += `${key}: ${value},`;
    });
    return strToReturn;
  }
}
