import { LEVELS, tgameLevel } from "../../data/levels";
import { useGameState } from "../../hooks/useGameState";

const Levels = () => {
    return (
        <> {
            Object.entries(LEVELS).map(([level, levelData], index) => {
                return < LevelsCircle
                    {...levelData}
                    key={`${level}-${index}`}
                    level={Number(level) as keyof typeof LEVELS}
                />
            })
        } </>
    )
}

type tlevelsCirlce = tgameLevel[number]
    & { level: keyof typeof LEVELS }

/**
 * Displays a level circle based on the current level.
 * @param {tlevelsCirlce}
 */
const LevelsCircle = (props: tlevelsCirlce) => {
    const { level = 1 } = props;
    const { currentLevel } = useGameState();

    const isPassed = level < currentLevel.level;
    const isCurrentLevel = level === currentLevel.level;

    return <div>
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
