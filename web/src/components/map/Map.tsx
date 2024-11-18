import { ReactNode } from "@tanstack/react-router";
import {
    MapContainer,
    TileLayer
} from "react-leaflet";

type gameMapProps = {
    children: ReactNode;
}

const GameMap = ({ children }: gameMapProps) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
};

export default GameMap;
