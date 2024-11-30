import { cn } from "@/lib/utils";
import { tnavigation } from "@/types/navigation"

import {
    BuildingIcon,
    LucideBanknote,
    MergeIcon,
    PersonStandingIcon,
    PhoneIcon
} from "lucide-react";

const iconStyles = "h-4 aspect-square";
const NAVIGATION_DATA: tnavigation[] = [
    {
        name: "Bank",
        icon: <LucideBanknote className={cn("", iconStyles)} />,
        subNavigation: [
            {
                name: "loan",
                link: "/bank/loan"
            },
            {
                name: "open account",
                link: "/bank/open-account",
            },
            {
                name: "rules",
                link: "/bank/rules",
            }
        ]
    },

    {
        name: "Legal",
        icon: <BuildingIcon className={cn("", iconStyles)} />,
        subNavigation: [
            {
                name: "Sue",
                link: "/legal/sue"
            },
            {
                name: "hire",
                link: "/legal/hire",
            },
            {
                name: "complain",
                link: "/legal/complain",
            },
            {
                name: "rules",
                link: "/legal/rules",
            },
        ]
    },

    {
        name: "Merge & Acquisition",
        icon: <MergeIcon className={cn("", iconStyles)} />,
        subNavigation: [
            {
                name: "Merge",
                link: "/merge-aqs/merge"
            },
            {
                name: "acquire",
                link: "/merge-aqs/acquire",
            },
            {
                name: "rules",
                link: "/legal/rules",
            },
        ]
    },

    {
        name: "General",
        icon: <PersonStandingIcon className={cn("", iconStyles)} />,
        subNavigation: [
            {
                name: "Level details",
                link: "/general/details"
            },
            {
                name: "Game map",
                link: "/general/map",
            },
            {
                name: "chat",
                link: "/general/chat",
            },
        ]
    },
    {
        name: "Support and help",
        icon: <PhoneIcon className={cn("", iconStyles)} />,
        subNavigation: [
            {
                name: "customer care",
                link: "/support/chat"
            },
            {
                name: "rules",
                link: "/support/rules",
            },
            {
                name: "Learn",
                link: "/support/tutorial",
            },
        ]
    },
]

export {
    NAVIGATION_DATA
}
