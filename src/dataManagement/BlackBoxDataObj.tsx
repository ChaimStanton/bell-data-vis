import { BlackBoxDataLine } from "./BlackBoxDataLine";

/**
 * A class to contain all of the data for the table
 */
export class BlackBoxDataObj {
  readonly dataLines = new Array<BlackBoxDataLine>();
  #isLoaded = false;

  constructor(data: Array<unknown>) {
    this.#makeDataLines(data);
    this.#isLoaded = true;
  }

  get isLoaded(): boolean {
    return this.#isLoaded;
  }

  #makeDataLines(table: Array<unknown>): void {
    table.forEach((row) => {
      this.dataLines.push(new BlackBoxDataLine(row as Record<string, string>));
    });
  }

  toString(): string {
    let strToReturn = "";
    this.dataLines.forEach((dataLine) => {
      strToReturn += dataLine.toString();
    });
    return strToReturn;
  }
}
