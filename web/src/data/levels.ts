export type tlocation = {
    lat: number,
    long: number,
};

// for now they follow a random tragectory, which will later be mapped to location in the game map.
export const LEVELS_TO_LOCATION_MAP: Record<number, tlocation> = {
    1: {
        lat: -6.201103985567785,
        long: 106.83000879116756
    },
    2: {
        lat: 1.3301960280623573,
        long: 103.74931860800882
    },
    3: {
        lat: 10.772207548037004,
        long: 106.27617424174164
    },
    4: {
        lat: 15.393719995590693,
        long: 99.68437691859054
    },
    5: {
        lat: 20.82121634598981,
        long: 102.40898647882632
    },
    6: {
        lat: 21.086433117593177,
        long: 96.12044630055821
    },
    7: {
        lat: 28.538094418611227,
        long: 100.82259457206862
    },
    8: {
        lat: 25.00785011718272,
        long: 90.71517305386871
    },
    9: {
        lat: 30.866288381136876,
        long: 89.39681372540785
    },
    10: {
        lat: 28.267506954562734,
        long: 83.85970454587223
    },
} as const;

export type tgameLevels = {
    name: string,
    description: string,
    location: tlocation,
}

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