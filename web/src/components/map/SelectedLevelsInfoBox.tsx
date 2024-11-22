import { Button } from "@nextui-org/react";
import { tlevelKey, tlevelInfo, DEFAULT_LEVEL, MAX_LEVEL, LEVELS } from "../../data/levels";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useGameState } from "../../hooks/useGameState";

type tselectedLevelInfoBoxProps = {
    isCurrentLevel?: boolean,
    isPassed?: boolean,
    setSelectedLevel: Dispatch<SetStateAction<tlevelKey>>
    selectedLevel: tlevelKey
} & tlevelInfo;


const SelectedLevelsInfoBox = (props: tselectedLevelInfoBoxProps) => {
    const {
        isCurrentLevel = false,
        isPassed = false,
        selectedLevel,
        setSelectedLevel,
        ...levelsInfo
    } = props;

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

    return (
        <section className="container bottom-10 left-1/2 -translate-x-1/2 bg-white absolute w-96 z-50 rounded-md text-gray-500">
            <div className="title">
                {levelsInfo.name}
            </div>
            <div className="description">
                {levelsInfo.description}
            </div>

            <Button
                disabled={isPrevBtnDisabled}
                onClick={(e) => handleLevelChange(-1, e)}>
                Previous
            </Button>

            <Button
                disabled={isNxtBtnDisabled}
                onClick={(e) => handleLevelChange(1, e)}>
                Next
            </Button>
        </section>
    )
}

export default SelectedLevelsInfoBox;
