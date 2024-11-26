import { RefObject } from "react";
import { create } from "zustand";
import { Map } from "leaflet";
import { DEFAULT_LEVEL, LEVELS, tlevelKey } from "@/data/levels";

type tgameState = typeof LEVELS[keyof typeof LEVELS] & { level: keyof typeof LEVELS };
type tgameStateStore = {
    gameState: tgameState,
    setLevel: (levelKey: tlevelKey) => void;

    // map reference to control map properties.
    mapRef: RefObject<Map> | null;
    setMapRef: (mapRef: RefObject<Map>) => void;
}

const DEFAULT_GAME_STATE: tgameState = {
    level: DEFAULT_LEVEL,
    ...LEVELS[DEFAULT_LEVEL]
}

const gameStateStore = create<tgameStateStore>((set) => ({
    gameState: DEFAULT_GAME_STATE,
    setLevel: (levelKey) => set({
        gameState: {
            level: levelKey,
            ...LEVELS[levelKey]
        }
    }),

    // map ref
    mapRef: null,
    setMapRef: (mapRef) => set({ mapRef: mapRef }),
}))

export const useGameState = () => {
    return gameStateStore();
}; 
