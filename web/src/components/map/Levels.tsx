import { useState } from "react";
import { useGameState } from "../../hooks/useGameState";
import { LEVELS, tlevelKey } from "../../data/levels";
import { LayerGroup, Marker } from "react-leaflet";
import LevelsCircle from "./LevelCircle";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import SelectedLevelsInfoBox from "./SelectedLevelsInfoBox";

const Levels = () => {
    const { currentLevel } = useGameState();

    // level circle that is active.
    const [selectedLevel, setSelectedLevel] = useState<tlevelKey>(currentLevel.level);

    return (
        <main className="Levels-screen">
            <LayerGroup>
                {Object.entries(LEVELS).map(([level, levelData], index) => {
                    const levelKey = Number(level) as tlevelKey;

                    const circleIcon = (
                        <LevelsCircle
                            level={levelKey}
                            isSelectedLevel={levelKey === selectedLevel}
                            {...levelData}
                        />);

                    return (
                        <Marker
                            key={`${level}-${index}`}
                            icon={divIcon({
                                html: renderToStaticMarkup(circleIcon),
                            })}
                            bubblingMouseEvents
                            eventHandlers={{
                                click: () => {
                                    const isAlreadySelected = selectedLevel === levelKey;
                                    if (isAlreadySelected)
                                        return;

                                    setSelectedLevel(levelKey);
                                }
                            }}
                            position={levelData.location}
                        />)
                })}
            </LayerGroup>

            <SelectedLevelsInfoBox
                level={selectedLevel}
                {...LEVELS[selectedLevel]}
            />


        </main>
    )
}

export default Levels;
