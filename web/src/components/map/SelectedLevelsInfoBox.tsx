import { Button, cn } from "@nextui-org/react";
import { tlevelKey, tlevelInfo, DEFAULT_LEVEL, MAX_LEVEL, LEVELS } from "../../data/levels";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useGameState } from "../../hooks/useGameState";
import { NextIcon, PreviousIcon, SquareLock02Icon } from "hugeicons-react";
import { ReactNode, Router, useRouter } from "@tanstack/react-router";
import { DEFAULT_USER_ID } from "../../routes/vital/$userId/game/$level";

type tselectedLevelInfoBoxProps = {
    setSelectedLevel: Dispatch<SetStateAction<tlevelKey>>
    selectedLevel: tlevelKey
} & tlevelInfo;

const SelectedLevelsInfoBox = (props: tselectedLevelInfoBoxProps) => {
    const {
        selectedLevel,
        setSelectedLevel,
        ...levelsInfo
    } = props;

    const router = useRouter();

    const { gameState } = useGameState();
    const isCurrentLevel = selectedLevel === gameState.level;
    const isPassedLevel = selectedLevel < gameState.level;
    const isLockedLevel = selectedLevel > gameState.level;

    const { mapRef } = useGameState();
    const isNxtBtnDisabled = selectedLevel === MAX_LEVEL;
    const isPrevBtnDisabled = selectedLevel === DEFAULT_LEVEL;

    const handleLevelChange = (direction: -1 | 1, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const nextLevel = selectedLevel + direction as tlevelKey;
        if (nextLevel === MAX_LEVEL + 1 || nextLevel === DEFAULT_LEVEL - 1)
            return;

        // panning into new level position.
        const newPosition = LEVELS?.[nextLevel]?.location;
        mapRef?.current?.panTo(newPosition, {
            duration: 0.75,
        });

        setSelectedLevel(nextLevel as tlevelKey)
    }

    const getPlayLvlBtnTxt = () => {
        let playLevelBtnText: ReactNode = "Choose Level";

        if (isCurrentLevel)
            return playLevelBtnText = "Continue Level";

        if (isPassedLevel)
            return playLevelBtnText = "Visit Level";

        if (isLockedLevel)
            return playLevelBtnText = <>
                <SquareLock02Icon /> Locked Level
            </>

        return playLevelBtnText;
    }


    return (
        <section
            className={cn(
                // layouting and positioning
                "container bottom-10 left-1/2 -translate-x-1/2  absolute max-w-[560px] w-[calc(100%-20px)] z-50 rounded-md text-gray-500",
                // styles
                "bg-white p-5 space-y-2.5"
            )
            }>

            <div className="buttons flex items-center w-30 gap-2.5 justify-end flex-wrap">
                <Button
                    disabled={isPrevBtnDisabled}
                    className="bg-primary disabled:opacity-50 disabled:hover:opacity-50"
                    onClick={(e) => handleLevelChange(-1, e)}>
                    <PreviousIcon />
                </Button>

                <Button
                    disabled={isNxtBtnDisabled}
                    className="bg-primary disabled:opacity-50 disabled:hover:opacity-50"
                    onClick={(e) => handleLevelChange(1, e)}>
                    <NextIcon />
                </Button>
            </div>

            <div className="main_content flex items-center  gap-5 flex-wrap justify-center">
                <div className="level_circle w-40 aspect-square bg-gray-300 rounded-full">
                </div>

                <div className="infoSection space-y-2.5 max-w-[320px]">
                    <div className="title text-gray-800 text-2xl font-bold">
                        {levelsInfo.name}
                    </div>
                    <div className="description text-gray-500 text-sm font-normal">
                        {levelsInfo.description}
                    </div>

                    <Button
                        fullWidth
                        disabled={isLockedLevel}
                        className="disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            if (isLockedLevel)
                                return;

                            if (isPassedLevel || isCurrentLevel)
                                router.navigate({
                                    to: "/vital/$userId/game/$level",
                                    params: {
                                        userId: DEFAULT_USER_ID,
                                        level: String(gameState.level),
                                    }
                                })
                        }}
                    >
                        {getPlayLvlBtnTxt()}
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default SelectedLevelsInfoBox;
