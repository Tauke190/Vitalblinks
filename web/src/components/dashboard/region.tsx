import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { HtmlHTMLAttributes } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";

type tRegionTabProps = {
} & HtmlHTMLAttributes<HTMLDivElement>

const RegionTab = (props: tRegionTabProps) => {
    const { className } = props;

    const { data: geoJsonData, isLoading } = useQuery({
        queryFn: () => fetch("https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson").then((res) => res.json()),
        queryKey: ["countryGeoJSON"],
    })

    return (
        <Card className={cn("", className)}>
            <CardHeader>Region</CardHeader>
            <CardBody>
                <MapContainer
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent"
                    }}
                    zoom={7}
                    center={[0, 0]}
                >
                    {isLoading
                        ? "Loading..."
                        : <GeoJSON
                            data={geoJsonData}
                            style={{
                                weight: 0.5,
                                fillOpacity: 1,
                                fillColor: "white"

                            }}
                            eventHandlers={{
                                mouseover: (e) => {
                                    const layer = e.target;
                                    layer.setStyle({
                                        weight: 1,
                                        color: "#666",
                                        fillOpacity: 0.7
                                    });
                                }
                            }}
                        />
                    }
                </MapContainer>
            </CardBody>
        </Card>
    )
}

RegionTab.displayName = "Region";
export default RegionTab;
