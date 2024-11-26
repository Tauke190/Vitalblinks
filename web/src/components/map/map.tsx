import { ReactNode, useEffect, useRef } from "react";
import {
    MapContainer,
    MapContainerProps,
    TileLayer
} from "react-leaflet";

// importing default react leaflet mandetory stylesheet
import 'leaflet/dist/leaflet.css';

import { useGameState } from "../../hooks/useGameState";
import { Map } from "leaflet";

type gameMapProps = {
    children?: ReactNode;
} & MapContainerProps

const GameMap = ({ children, ...mapProps }: gameMapProps) => {
    const { gameState, setMapRef } = useGameState();

    if (!gameState)
        return;

    const mapRef = useRef<Map>(null);

    useEffect(() => {
        setMapRef(mapRef);
    }, [mapRef])

    return (
        <MapContainer
            ref={mapRef}
            zoom={7}
            maxZoom={8}
            minZoom={6}
            center={gameState.location}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100vw" }}
            {...mapProps}
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
