import { ReactNode, useEffect, useRef } from "react";
import {
    MapContainer,
    MapContainerProps,
    GeoJSON,
} from "react-leaflet";

// importing default react leaflet mandetory stylesheet
import 'leaflet/dist/leaflet.css';

import { useGameState } from "../../hooks/useGameState";
import { Map } from "leaflet";

import { useQuery } from "@tanstack/react-query";

type gameMapProps = {
    children?: ReactNode;
} & MapContainerProps

const GameMap = ({ children, ...mapProps }: gameMapProps) => {
    const { gameState, setMapRef } = useGameState();
    const { data: geoJsonData, isLoading } = useQuery({
        queryFn: () => fetch("https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson").then((res) => res.json()),
        queryKey: ["countryGeoJSON"],
    })
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
            {!isLoading &&
                <GeoJSON data={geoJsonData} style={{
                    weight: 0.5,
                    fillOpacity: 1
                }} />
            }
            {children}
        </MapContainer>
    )
};

export default GameMap;
