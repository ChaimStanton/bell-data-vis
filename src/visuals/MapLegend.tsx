import { Component } from "react";

export interface legendProp {
  colorMap: Map<string, string>;
}

export class MapLegend extends Component<legendProp> {
  render(): JSX.Element {
    return (
      <div className="container-fluid bg-primary-subtle">
        <h1>Legend</h1>
        <p>Hover over a point and click for more info</p>
        <div className="row">
          {Array.from(this.props.colorMap.entries()).map(([key, value]) => (
            <div className="legendRow col" key={key}>
              <span
                className="color-box"
                style={{
                  background: value,
                  width: "20px",
                  height: "20px",
                  paddingLeft: "1rem",
                }}
              ></span>
              <p
                style={{
                  margin: 0,
                  display: "inline",
                  overflowWrap: "break-word",
                }}
              >
                {key}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
