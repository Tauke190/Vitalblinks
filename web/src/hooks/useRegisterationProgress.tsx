import { ReactNode } from "@tanstack/react-router";
import { create } from "zustand";
import { BadgeCheckIcon, UserRoundIcon } from "lucide-react"

type tregStage = {
    name: "onboarding" | "info" | "confirmation";
    sn: number;
    lineProgress: number;
    icon: ReactNode;
};

export const STAGES: tregStage[] = [
    {
        sn: 1,
        name: "onboarding",
        lineProgress: 0,
        icon: null,
    },
    {
        sn: 2,
        name: "info",
        lineProgress: 50,
        icon: <UserRoundIcon className='h-4 w-4 text-white text-opacity-50' />,
    },
    {
        sn: 3,
        name: "confirmation",
        lineProgress: 100,
        icon: <BadgeCheckIcon className="h-4 w-4 text-white text-opacity-50" />,
    },
];

type tregProgStore = {
    currentStage: tregStage,
    setCurrentStage: (newStage: tregProgStore["currentStage"]) => void

    progress: number
    setProgress: (newProgress: tregProgStore["progress"]) => void
}

const regProgStore = create<tregProgStore>((set) => ({
    currentStage: STAGES[0],
    setCurrentStage(newStage) {
        return set({ currentStage: newStage })
    },

    progress: 0,
    setProgress(newProgress) {
        return set({ progress: newProgress })
    },
}))

export const useRegProg = (): tregProgStore => {
    return regProgStore();
}
