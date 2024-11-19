import { Marker } from "react-leaflet";
import { LEVELS, tgameLevel } from "../../data/levels";
import { useGameState } from "../../hooks/useGameState";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server"

const Levels = () => {
    return (
        <> {
            Object.entries(LEVELS).map(([level, levelData], index) => {
                const circleIcon = <LevelsCircle
                    level={Number(level) as keyof typeof LEVELS}
                    {...levelData}
                />;

                return (
                    <Marker
                        key={`${level}-${index}`}
                        icon={divIcon({ html: renderToStaticMarkup(circleIcon) })}
                        position={levelData.location}
                    />)
            })
        } </>
    )
}

type tlevelsCirlce = tgameLevel[number]
    & { level: keyof typeof LEVELS }

/**
 * Displays a level circle based on the current level.
 * @param props {tlevelsCirlce}
 */
const LevelsCircle = (props: tlevelsCirlce) => {
    const { level = 1 } = props;
    const { currentLevel } = useGameState();

    const isPassed = level < currentLevel.level;
    const isCurrentLevel = level === currentLevel.level;

    return <div className="w-5 h-5 bg-green-300">
        {props.name}
    </div>
}


const styles = {
    currentLevelStyles: ``,
    nextLevelStyles: ``,
    previousLevelStyles: ``,
    unlockedLevelStyles: ``,
    lockedLevelStyles: ``,
}


export default Levels;
