import { useState } from "react"
import { LEVELS } from "../data/levels";

type tcurrentLevel = typeof LEVELS[keyof typeof LEVELS] & { level: number };

export const useGameState = () => {
    const [currentLevel, setCurrentLevel] = useState<tcurrentLevel>({
        level: 1
        , ...LEVELS[1]
    });
    const [levelProgress, setLevelProgress] = useState<number>(50);

    return {
        currentLevel,
        levelProgress
    }
}
