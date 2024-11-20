import { LEVEL_CIRCLE_DIMENSION, tgameLevel, tlevelKey } from "../../data/levels";
import { useGameState } from "../../hooks/useGameState";
import { cn } from "@nextui-org/react";

type tlevelsCirlce = tgameLevel[number]
    & { level: tlevelKey, isSelectedLevel?: boolean }

/**
 * Displays a level circle based on the current level.
 * @param props {tlevelsCirlce}
 */
const LevelsCircle = (props: tlevelsCirlce) => {
    const { level = 1, isSelectedLevel = false } = props;
    const { currentLevel } = useGameState();

    const isPassedLevel = level < currentLevel.level;
    const isCurrentLevel = level === currentLevel.level;
    const isLockedLevel = level > currentLevel.level;

    const BaseLevelCircle = () => (
        <div
            style={LEVEL_CIRCLE_DIMENSION}
            className={
                cn({
                    [LevelsCirlceStyle.selected]: isSelectedLevel,
                    [LevelsCirlceStyle.default]: true,
                    [LevelsCirlceStyle.unlocked]: isPassedLevel,
                    [LevelsCirlceStyle.current]: isCurrentLevel,
                    [LevelsCirlceStyle.locked]: isLockedLevel,
                })}>
            {level}
        </div>)

    switch (true) {
        case isCurrentLevel: {
            return (
                <div className={cn(LevelsCirlceStyle.default_wrapper, "currentWrapper")}>
                    <div
                        className={cn("absolute rounded-full bg-primary animate-ping")}
                        style={LEVEL_CIRCLE_DIMENSION}
                    />
                    <BaseLevelCircle />
                </div>
            )
        }

        case isSelectedLevel: {
            return (
                <div className={cn(LevelsCirlceStyle.default_wrapper, "selectedWrapper")}>
                    <div
                        className={cn("rounded-full bg-transparent absolute z-40 border-3 border-primary ")}
                        style={{
                            height: LEVEL_CIRCLE_DIMENSION.height + 10,
                            width: LEVEL_CIRCLE_DIMENSION.width + 10,
                        }} />
                    <BaseLevelCircle />
                </div>
            )
        }

        case isLockedLevel: {
            return (
                <div className={cn(LevelsCirlceStyle.default_wrapper, "selectedWrapper")}>
                    <BaseLevelCircle />
                </div>
            )
        }

        case isPassedLevel: {
            return (
                <div className={cn(LevelsCirlceStyle.default_wrapper, "selectedWrapper")}>
                    <BaseLevelCircle />
                </div>
            )
        }
    }

}


const LevelsCirlceStyle = {
    default_wrapper: `relative flex items-center justify-center`,
    current: ``,
    default: `w-20 h-20 bg-white text-black rounded-full border-none flex items-center justify-center font-bold text-2xl absolute z-50`,
    unlocked: ``,
    locked: ``,
    selected: ``,
}

LevelsCircle.displayName = "LevelsCircle";
export default LevelsCircle;
