import { Table } from "apache-arrow";
import "leaflet/dist/leaflet.css";
import { type ReactNode } from "react";
import { Container } from "react-bootstrap";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { DbConn } from "../DbConn";
import { MapLegend } from "./MapLegend";
import { Visual, type VisualProp } from "./Visual";
import JSONBig from "json-big";

type stateType = {
  data: Table | null;
};

export class BlackBoxMap extends Visual<VisualProp, stateType> {
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
    this.state = {
      data: null,
    };
  }

  componentDidMount(): void {
    DbConn.getTelematicData().then((data) => {
      this.setState({ data: data });
    });
  }

  render(): ReactNode {
    if (this.state.data == null) {
      return <div>Loading...</div>;
    }

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

          {this.state.data.toArray().map((line) => {
            const lineJSON = line.toJSON();
            return (
              <CircleMarker
                center={{
                  lat: lineJSON["Latitude"],
                  lng: lineJSON["Longitude"],
                }}
                key={
                  lineJSON["Journey Event ID"] + ":" + lineJSON["Journey ID"]
                }
                radius={10}
                fillColor={this.#colorMap.get(lineJSON["Event Description"])}
                fillOpacity={1}
              >
                <Popup maxWidth={500}>
                  <p>{JSONBig.stringify(lineJSON)}</p>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
        <MapLegend colorMap={this.#colorMap} />
      </Container>
    );
  }
}
