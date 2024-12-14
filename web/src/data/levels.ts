import { latLng, LatLng } from "leaflet";

export type tlocation = LatLng;

// for now they follow a random tragectory, which will later be mapped to location in the game map.
export const LEVELS_TO_LOCATION_MAP: Record<number, tlocation> = {
    1: latLng(-6.201103985567785, 106.83000879116756),
    2: latLng(1.3301960280623573, 103.74931860800882),
    3: latLng(10.772207548037004, 106.27617424174164),
    4: latLng(15.393719995590693, 99.68437691859054),
    5: latLng(20.82121634598981, 102.40898647882632),
    6: latLng(21.086433117593177, 96.12044630055821),
    7: latLng(28.538094418611227, 100.82259457206862),
    8: latLng(25.00785011718272, 90.71517305386871),
    9: latLng(30.866288381136876, 89.39681372540785),
    10: latLng(28.267506954562734, 83.85970454587223),
};

export type tlevelKey = keyof typeof LEVELS;
export type tlevelInfo = typeof LEVELS[tlevelKey]

export const LEVELS = Object.freeze({
    1: {
        name: "Perfect Information",
        description: "Follow the rules.",
        location: LEVELS_TO_LOCATION_MAP[1]
    },
    2: {
        name: "Dominant Strategy",
        description: "Accumulate wealth to show dominance.",
        location: LEVELS_TO_LOCATION_MAP[2]
    },
    3: {
        name: "Zero sum game",
        description: "Minimize loss.",
        location: LEVELS_TO_LOCATION_MAP[3]
    },
    4: {
        name: "Prisoner's dilemma",
        description: "Develop a breakthrough strategy to manage the change. Put yourself in others shoes and act accordingly.",
        location: LEVELS_TO_LOCATION_MAP[4]
    },
    5: {
        name: "Imperfect Information",
        description: "Validate your perception about other players.",
        location: LEVELS_TO_LOCATION_MAP[5]
    },
    6: {
        name: "Game of chicken",
        description: "Determine your risk appetite.",
        location: LEVELS_TO_LOCATION_MAP[6]
    },
    7: {
        name: "Variable sum",
        description: "Break away from the pact.",
        location: LEVELS_TO_LOCATION_MAP[7]
    },
    8: {
        name: "Stag hunt",
        description: "To be discussed.",
        location: LEVELS_TO_LOCATION_MAP[8]
    },
    9: {
        name: "Nash Equilibrium",
        description: "Close in on victory.",
        location: LEVELS_TO_LOCATION_MAP[9]
    },
    10: {
        name: "Mixed Strategy",
        description: "Be Unpredictable.",
        location: LEVELS_TO_LOCATION_MAP[10]
    }
} as const);

export const DEFAULT_LEVEL = 1;
export const MAX_LEVEL = 10;

export const LEVEL_CIRCLE_DIMENSION = {
    width: 80,
    height: 80,
} as const;
