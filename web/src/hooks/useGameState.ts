import { useState } from "react"
import { LEVELS } from "../data/levels";

type tcurrentLevel = typeof LEVELS[keyof typeof LEVELS] & { level: keyof typeof LEVELS };

export const useGameState = () => {
    const [currentLevel, setCurrentLevel] = useState<tcurrentLevel>({
        level: 1 as const
        , ...LEVELS[1]
    });
    const [levelProgress, setLevelProgress] = useState<number>(50);

    return {
        currentLevel,
        levelProgress
    }
}
