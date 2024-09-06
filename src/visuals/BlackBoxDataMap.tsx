import { type ReactNode } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { type BlackBoxDataLine } from "../dataManagement/BlackBoxDataLine";
import { MapLegend } from "./MapLegend";
import { Visual, type VisualProp } from "./Visual";
import { Container } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

export class BlackBoxMap extends Visual<VisualProp> {
  readonly #colorMap: Map<string, string> = new Map<string, string>([
    ["RTP_EVT_JOURNEY_START", "green"],
    ["RTP_EVT_JOURNEY_END", "red"],
    ["RTP_EVT_EXCESSIVE_ACCELERATION", "yellow"],
    ["RTP_EVT_EXCESSIVE_DECELERATION", "pink"],
    ["RTP_EVT_IDLE_START", "blue"],
    ["RTP_EVT_CHARGING_FAULT", "lime"],
    ["RTP_EVT_IDLE_END", "orange"],
  ]);

  constructor(props: VisualProp) {
    super("Bell Black Box data of Chaim Stanton", "blackBoxMap", props);
  }

  render(): ReactNode {
    return (
      <Container>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: "700px" }}
          maxZoom={18}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {this.props.data.dataLines.map((line: BlackBoxDataLine) => {
            if (Number.isNaN(line.coord.lng) || Number.isNaN(line.coord.lat)) {
              // console.log("nan error" + line.coord.toString());
              return false;
            } else if (
              !(line["Event Description"] === "RTP_EVT_DA_JOURNEY_DETAIL_V3")
            ) {
              return (
                <CircleMarker
                  center={[line.coord.lat, line.coord.lng]}
                  key={line.coord.debugRef}
                  radius={10}
                  // color="black"
                  // weight={1}
                  fillColor={this.#colorMap.get(line["Event Description"])}
                  fillOpacity={1}
                >
                  <Popup>{line.toString()}</Popup>
                </CircleMarker>
              );
            } else {
              return false;
            }
          })}
        </MapContainer>
        <MapLegend colorMap={this.#colorMap} />
      </Container>
    );
  }
}
