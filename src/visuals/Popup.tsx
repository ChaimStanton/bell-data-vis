export class Popup {
  /** A class to contain our popup animation */
  text: string;
  x: number;
  y: number;

  constructor(x: number, y: number, text: string) {
    this.x = x;
    this.y = y;
    this.text = text;
  }
}
