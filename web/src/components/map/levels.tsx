import { useState } from "react";
import { useGameState } from "../../hooks/useGameState";
import { LEVELS, tlevelKey } from "../../data/levels";
import { LayerGroup, Marker } from "react-leaflet";
import LevelsCircle from "./levelCircle";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import SelectedLevelsInfoBox from "./selectedLevelsInfoBox";

const Levels = () => {
    const { gameState } = useGameState();

    // level circle that is active.
    const [selectedLevel, setSelectedLevel] = useState<tlevelKey>(gameState.level);

    return (
        <div className="Levels-screen">
            <LayerGroup>
                {Object.entries(LEVELS).map(([level, levelData], index) => {
                    const levelKey = Number(level) as tlevelKey;
                    const isSelectedLevel = levelKey === selectedLevel;

                    const circleIcon = (
                        <LevelsCircle
                            level={levelKey}
                            isSelectedLevel={isSelectedLevel}
                            {...levelData}
                        />);

                    return (
                        <Marker
                            autoPan={isSelectedLevel}
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
                {...LEVELS[selectedLevel]}
                setSelectedLevel={setSelectedLevel}
                selectedLevel={selectedLevel}
            />
        </div>
    )
}

export default Levels;
