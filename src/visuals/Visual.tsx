import { Component } from "react";
import { DbConn } from "../DbConn";

export interface VisualProp {
  data: DbConn;
}

/** A base class for all visual graphs */
export abstract class Visual<
  PropType extends VisualProp,
  stateType,
> extends Component<PropType, stateType> {
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
}
