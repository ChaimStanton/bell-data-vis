import { Component } from "react";
import { type BlackBoxDataObj } from "../dataManagement/BlackBoxDataObj";

export interface VisualProp {
  data: BlackBoxDataObj;
}

/** A base class for all visual graphs */
export abstract class Visual<
  PropType extends VisualProp,
> extends Component<PropType> {
  static width = 1024;
  static height = 579;
  readonly name: string;
  readonly id: string;

  /**
   * @param {string} name the name of the variable to be used on display
   * @param {string} id an ID string for the variable
   * @param prop for the data
   */
  constructor(name: string, id: string, props: PropType) {
    super(props);
    this.name = name;
    this.id = id;
  }

  // superSetup(): void {
  //   // this actually gets called from the draw function
  //   this.canvas = createCanvas(Visual.width, Visual.height);
  //   this.canvas.parent("app");
  //   this.setup?.();
  // }

  // superDestroy(): void {
  //   this.canvas.remove();
  //   this.destroy?.();
  // }
}
