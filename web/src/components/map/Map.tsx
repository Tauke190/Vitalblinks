import { ReactNode } from "react";
import {
    MapContainer,
    TileLayer
} from "react-leaflet";

// importing default react leaflet mandetory stylesheet
import 'leaflet/dist/leaflet.css';

import { useGameState } from "../../hooks/useGameState";

type gameMapProps = {
    children?: ReactNode;
}

const GameMap = ({ children }: gameMapProps) => {
    const { currentLevel } = useGameState();

    if (!currentLevel)
        return;

    return (
        <MapContainer
            zoom={7}
            center={currentLevel.location}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100vw" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
};

export default GameMap;
