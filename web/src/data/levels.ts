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
        name: "Level 1",
        description: "Navigate the bustling streets of Jakarta, where ancient treasures hide among modern skyscrapers.",
        location: LEVELS_TO_LOCATION_MAP[1]
    },
    2: {
        name: "Level 2",
        description: "Explore Singapore's vibrant cityscape, where tradition meets innovation in a garden city.",
        location: LEVELS_TO_LOCATION_MAP[2]
    },
    3: {
        name: "Level 3",
        description: "Journey through Ho Chi Minh City's maze of streets, uncovering secrets in this historic metropolis.",
        location: LEVELS_TO_LOCATION_MAP[3]
    },
    4: {
        name: "Level 4",
        description: "Venture into Thailand's ancient ruins, where mystical temples guard age-old mysteries.",
        location: LEVELS_TO_LOCATION_MAP[4]
    },
    5: {
        name: "Level 5",
        description: "Trek through Laos' misty mountains, discovering hidden villages and forgotten paths.",
        location: LEVELS_TO_LOCATION_MAP[5]
    },
    6: {
        name: "Level 6",
        description: "Uncover the secrets of Myanmar's golden temples and sacred sites in Bagan.",
        location: LEVELS_TO_LOCATION_MAP[6]
    },
    7: {
        name: "Level 7",
        description: "Scale the heights of Yunnan's dramatic landscapes, where nature meets ancient Chinese culture.",
        location: LEVELS_TO_LOCATION_MAP[7]
    },
    8: {
        name: "Level 8",
        description: "Cross the mystical valleys of Bhutan, where dragons and legends come alive.",
        location: LEVELS_TO_LOCATION_MAP[8]
    },
    9: {
        name: "Level 9",
        description: "Brave the Tibetan plateau's challenging terrain, where wisdom echoes through mountain passes.",
        location: LEVELS_TO_LOCATION_MAP[9]
    },
    10: {
        name: "Level 10",
        description: "Conquer the peaks of Nepal, where your journey reaches new heights in the shadow of Everest.",
        location: LEVELS_TO_LOCATION_MAP[10]
    }
} as const);

/**
 * Tailwind class that sets the dimension of levels circle.
 */
export const LEVEL_CIRCLE_DIMENSION = {
    width: 80,
    height: 80,
} as const;
